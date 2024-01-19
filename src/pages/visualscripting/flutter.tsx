import { useEffect, useRef, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { NodeCategory, items } from './nodes';
import Draggable from 'react-draggable';
import randomizedId, { isValid } from 'utils';
import * as S from './styles';
import randomizedId, { isValid } from 'utils';
import * as S from './styles';
import MyFormField, { Enum_MyFormFieldType } from 'components/myForm/field';
import { MyButtonIcon } from 'components/myForm/button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const debug: boolean = false;

enum EnumNodePinType {
  input,
  output,
}

interface INodePin {
  id: string;
  type: EnumNodePinType;
}

enum EnumConnectionStep {
  none,
  selectInput,
  selectOutput,
}

interface ICoordinates {
  x: number;
  y: number;
}

const mousePosition: ICoordinates = {
  x: 0,
  y: 0,
};

// DEPRECATED ---------------------------------------
const textItem: vsItem = {
  name: 'text',
  code: 'Text("Hello, World")',
  id: '',
  position: { x: 0, y: 0 },
  children: [],
  category: NodeCategory.ALL,
  properties: {},
  description: '',
};

const rowItem: vsItem = {
  name: 'row',
  code: `Row(children:
    __CHILDREN__
)`,
  children: [],
  id: '',
  position: { x: 0, y: 0 },
  category: NodeCategory.ALL,
  properties: {},
  description: '',
};

const columnItem: vsItem = {
  name: 'column',
  code: `Column(children: 
    __CHILDREN__
)`,
  children: [],
  id: '',
  position: { x: 0, y: 0 },
  category: NodeCategory.ALL,
  properties: {},
  description: '',
};

const rootItem: vsItem = {
  name: 'root',
  code: `MyApp(
    __CHILDREN__
)`,
  children: [],
  id: '',
  position: { x: 0, y: 0 },
  category: NodeCategory.ALL,
  properties: {},
  description: '',
};
//---------------------------------------

export interface Item {
  category: NodeCategory;
  name: string;
  code: string;
  properties: {};
  description: string;
  child?: vsConnector;
}

// Represents the VisualScripting Node:
interface vsItem extends Item {
  id: string;
  position: ICoordinates;
  children: vsItem[]; // just for testing
}

interface IContextMenu {
  items: Item[];
  onItemClick: (option: Item) => void;
  selectedCategory?: NodeCategory;
}

interface Identifiers {
  outputId: string;
  inputId: string;
}

interface vsConnector {
  id: string;
  outputPinId: string;
  inputPinId: string;
}

const buttons = () => {
  return items.map((item) => (
    <Tooltip title={item.description}>
      <Button
        key={item.name}
        onClick={() => {
          AddCodeToGenFromButton(item);
        }}
      >
        {item.name}
      </Button>
    </Tooltip>
  ));
};

const AddCodeToGenFromButton = (item: Item) => {
  const generatedCodeElement = document.getElementById(
    'generatedCode'
  ) as HTMLTextAreaElement;

  if (generatedCodeElement) {
    const { selectionStart, selectionEnd } = generatedCodeElement;
    const currentValue = generatedCodeElement.value;

    // Insert the code at the cursor position
    const newValue =
      currentValue.substring(0, selectionStart) +
      item.code +
      currentValue.substring(selectionEnd);

    // Set the updated value of the textarea
    generatedCodeElement.value = newValue;

    // Move the cursor to the end of the inserted code
    const newCursorPosition = selectionStart + item.code.length;
    generatedCodeElement.selectionStart = newCursorPosition;
    generatedCodeElement.selectionEnd = newCursorPosition;
  }
};

// Remove an item by id from a vsItem[] type object:
const removeVsItemById = (object: vsItem[], id: string) => {
  const selectedObject = object.find((item) => item.id == id);
  const idOfSelectedObject = selectedObject?.id;

  if (
    isValid(object) &&
    isValid(selectedObject) &&
    isValid(idOfSelectedObject)
  ) {
    return (object = object.filter((item) => item.id !== idOfSelectedObject));
  }
  return object;
};

const getNodeFromNodePin = (pinId: string) => {
  const pin = document.getElementById(pinId);
  return pin?.closest('.react-draggable')?.parentElement;
};

const Connector = ({ id, outputPinId, inputPinId }: vsConnector) => {
  const lineOffset = 30;
  const strokeWidth = 1;
  const strokeColor = 'grey';

  const outputPin = document.getElementById(outputPinId);
  const inputPin = document.getElementById(inputPinId);

  if (outputPin !== null && inputPin !== null) {
    const outputPinPosition = outputPin.getBoundingClientRect();
    const inputPinPosition = inputPin.getBoundingClientRect();

    return (
      <S.ConnectorsLayer>
        <svg width="100%" height="100%">
          <line
            x1={outputPinPosition.x - 80 + lineOffset}
            y1={outputPinPosition.y - 203}
            x2={outputPinPosition.x - 80}
            y2={outputPinPosition.y - 203}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
          />
          <line
            x1={outputPinPosition.x - 80 + lineOffset}
            y1={outputPinPosition.y - 203}
            x2={inputPinPosition.x - 80 - lineOffset}
            y2={inputPinPosition.y - 203}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
          />
          <line
            x1={inputPinPosition.x - 80 - lineOffset}
            y1={inputPinPosition.y - 203}
            x2={inputPinPosition.x - 80}
            y2={inputPinPosition.y - 203}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
          />
        </svg>
      </S.ConnectorsLayer>
    );
  } else {
    return <></>;
  }
};

export const Flutter = () => {
  const mousePositionRef = useRef<ICoordinates>({ x: 0, y: 0 });
  const identifiers = useRef<Identifiers>({ outputId: '', inputId: '' });
  const [connectors, setConnectors] = useState<vsConnector[]>([]);
  const [vsItems, setVsItems] = useState<vsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(NodeCategory.ALL);

  useEffect(() => {
    console.log('vsItems:', vsItems);
    console.log('connectors:', connectors);

    const delay = 1000; // Adjust the delay time in milliseconds as needed

    const timeoutId = setTimeout(() => {
      AddCodeToGenFromVS(vsItems);
    }, delay);

    // Clean up the timeout to avoid unnecessary calls
    return () => clearTimeout(timeoutId);
  }, [vsItems, connectors]);

  const vsItemById = (id: string) => {
    const foundItem = vsItems.find((item) => item.id === id);
    return foundItem;
  };

  // usually called from useEffect:
  const AddCodeToGenFromVS = (vsItems: vsItem[]) => {
    const generatedCodeElement = document.getElementById(
      'generatedCode'
    ) as HTMLTextAreaElement;

    function generateCode(item: vsItem): string {
      if (item != undefined) {
        let code = item.code!;
        let hasChildren = isValid(item.children);

        if (hasChildren) {
          console.log('I have children');
          let child = item.children[0]; // it might not be the best way, because this ref is not state updated (its an old ref)
          generateCode(child);
          code = code.replace('__CHILDREN__', child.code);
        }

        return `${code}`;
      }
      return '';
    }

    const generatedCode = generateCode(vsItems[0]);

    console.log(
      `Big Log: ${JSON.stringify(vsItems)} ${JSON.stringify(
        connectors
      )} ${generatedCode}`
    );

    /*
    const splitText = (text: string, by: string) => {
      const splitedCodeForInsertion = text.split(by);
      if (splitedCodeForInsertion.length > 1) {
        return {
          partial1: splitedCodeForInsertion[0],
          partial2: splitedCodeForInsertion[1],
        };
      } else {
        return {
          partial1: '',
          partial2: '',
        };
      }
    };

    const injectCode = (partial1: string, partial2: string, code: string) => {
      if (isValid(partial1) && isValid(partial2)) {
        write = partial1 + code + partial2;

        return write;
      }
    };

    if (generatedCodeElement) {
      let copiedVsItems = vsItems;

      copiedVsItems.map((item) => {
        // If item has child:
        const checkForChild = (item: vsItem) => {
          const codeSplitter = '__child[0]__';
          const { partial1, partial2 } = splitText(write, codeSplitter);
          debugger;
          if (isValid(item.child)) {
            // Grab node id from InputPinId:
            const getIdFromInputPin = item.child
              ? item.child.inputPinId.split('_')[0]
              : '';
            if (isValid(getIdFromInputPin)) {
              //copiedVsItems = removeVsItemById(copiedVsItems, getIdFromInputPin);
              const childItem = vsItemById(getIdFromInputPin);
              const genText = `${injectCode(
                partial1,
                partial2,
                `${childItem?.code}`
              )}`;

              write = genText;

              debugger;

              // Once code injected above, try to catch another child from this new vsItem:
              isValid(childItem) && checkForChild(childItem!);
            }
          } else {
            write = item.code;
          }
        };
        checkForChild(item);
      });

      generatedCodeElement.value = write;
    }
    
    */
    generatedCodeElement.value = `${generatedCode}`;
  };

  const ContextMenuLanguageFilter = () => {
    const categories = Object.values(NodeCategory);

    const handleCategoryChange = (category: NodeCategory) => {
      setSelectedCategory(category);
    };

    return (
      <div className="category-filter">
        {categories.map((category, index) => (
          <S.CategoryLanguageFilter
            category={category}
            key={index}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
            title={category}
          ></S.CategoryLanguageFilter>
        ))}
      </div>
    );
  };

  const ContextMenu = ({
    items,
    onItemClick,
    selectedCategory,
  }: IContextMenu) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredItems = items.filter((item) => {
      // Check if the item's category matches the selected category
      const categoryMatch =
        selectedCategory === NodeCategory.ALL ||
        item.category === selectedCategory;

      // Check if the item's name contains the search term (case-insensitive)
      const searchTermMatch =
        searchTerm.length === 0 ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Include the item in the filtered list if both conditions are met
      return categoryMatch && searchTermMatch;
    });

    return (
      <S.ContextMenu>
        <ContextMenuLanguageFilter />
        <MyFormField
          name=""
          placeholder="Search Node"
          formFieldType={Enum_MyFormFieldType.input}
          callback={(e) => setSearchTerm(e.target.value)}
        />
        <S.ContextMenuList>
          {filteredItems.map((option, index) => (
            <S.ContextMenuEntry
              key={index}
              onClick={() => onItemClick(option)}
              category={option.category}
              title={option.description}
            >
              {option.name}
            </S.ContextMenuEntry>
          ))}
        </S.ContextMenuList>
        <S.ContextMenuTools>
          <MyButtonIcon
            onClick={() => handleCleanAll()}
            icon={<DeleteForeverIcon />}
          />
        </S.ContextMenuTools>
      </S.ContextMenu>
    );
  };

  const closeConnector = () => {
    const newConnector: vsConnector = {
      id: randomizedId(),
      outputPinId: identifiers.current.outputId,
      inputPinId: identifiers.current.inputId,
    };
    setConnectors((prev) => [...prev, { ...newConnector }]);
    // update child from vsItem:
    const parentItem = getNodeFromNodePin(newConnector.outputPinId);
    const childItem = getNodeFromNodePin(newConnector.inputPinId);
    const childAttributes = childItem?.dataset.props;
    const childVsItem = JSON.parse(`${childAttributes}`);

    // TODO: iterate trought all and apply all relative children for each one ...

    setVsItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === parentItem!.id) {
          return {
            ...item,
            child: { ...newConnector },
            children: [childVsItem],
          };
        }
        return item;
      });
    });
  };

  const HandleConnector = (type: EnumNodePinType, id: string) => {
    switch (type) {
      case EnumNodePinType.output:
        identifiers.current.outputId = id;
        break;
      case EnumNodePinType.input:
        identifiers.current.inputId = id;
        closeConnector();
        break;
      default:
        break;
    }
  };

  const updateNodePosition = (vsItemId: string, position: ICoordinates) => {
    setVsItems((prevItems) => {
      return prevItems.map((i) => {
        if (i.id === vsItemId) {
          return { ...i, position: position };
        }
        return i;
      });
    });
  };

  const NodePin = ({ id, type }: INodePin) => {
    return (
      <>
        <S.NodePin id={id} onClick={() => HandleConnector(type, id)} />
        {debug && `${id}, ${type}`}
      </>
    );
  };

  const Node = (item: vsItem) => {
    const { id, category, name, properties, position } = item;
    return (
      <div
        id={id}
        title={JSON.stringify(item)}
        data-props={JSON.stringify(item)}
      >
        <Draggable
          position={position}
          onStop={(e, data) => {
            const isEqual = data.x === position.x && data.y === position.y;
            if (!isEqual) {
              updateNodePosition(id, { x: data.x, y: data.y });
            }
          }}
        >
          <S.Node>
            <S.NodeName category={category}>{name}</S.NodeName>
            <div className="draggable-container">
              <S.NodeContent>
                <S.NodeInputs>
                  <div>
                    <NodePin id={`${id}_np-1`} type={EnumNodePinType.input} />
                  </div>
                  <div>{JSON.stringify(properties)},</div>
                </S.NodeInputs>
                <S.NodeOutputs>
                  <div>
                    child:
                    <NodePin id={`${id}_np-2`} type={EnumNodePinType.output} />
                  </div>
                </S.NodeOutputs>
              </S.NodeContent>
            </div>
          </S.Node>
        </Draggable>
      </div>
    );
  };

  const handleMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePositionRef.current = { x, y };
  };

  const handleClick = (event: any) => {
    // setShowContextMenu(false);
  };

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    // setShowContextMenu(true);
  };

  const handleOptionClick = (item: Item) => {
    setVsItems((prev) => [
      ...prev,
      { id: `vsItem-${randomizedId()}`, ...item, position: { x: 0, y: 0 } },
    ]);
    // setShowContextMenu(false);
  };

  const handleCleanAll = () => {
    setVsItems([]);
    setConnectors([]);
  };

  return (
    <>
      <S.Visual
        id="visualCode"
        title={JSON.stringify(vsItems)}
        //onContextMenu={handleContextMenu}
        //onClick={handleClick}
        //onMouseMove={handleMouseMove}
      >
        <ContextMenu
          items={items}
          onItemClick={handleOptionClick}
          selectedCategory={selectedCategory}
        />
        {vsItems.length > 0 && vsItems.map((i) => <Node {...i} key={i.id} />)}
        {connectors.length > 0 &&
          connectors.map((c) => <Connector {...c} key={c.id} />)}
      </S.Visual>
      <S.WrapperGeneratedCode id="generatedCode"></S.WrapperGeneratedCode>
      {buttons()}
      <>{debug && `debug: ${JSON.stringify(connectors)}`}</>
    </>
  );
};
export { NodeCategory };
