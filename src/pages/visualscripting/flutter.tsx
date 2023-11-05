import { useEffect, useRef, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { NodeCategory, items } from './nodes';
import Draggable from 'react-draggable';
import randomizedId from 'utils';
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
    AddCodeToGenFromVS(vsItems, connectors);
  }, [vsItems, connectors]);

  const vsItemById = (id: string) => {
    const foundItem = vsItems.find((item) => item.id === id);
    return foundItem;
  };

  // usually called from useEffect:
  const AddCodeToGenFromVS = (
    vsItems: vsItem[],
    vsConnector: vsConnector[]
  ) => {
    const generatedCodeElement = document.getElementById(
      'generatedCode'
    ) as HTMLTextAreaElement;

    let write = '';
    if (generatedCodeElement) {
      vsItems.map((i) => {
        const { code, child } = i;

        // spliting vsItem.code to concat other codes:
        const splitedCodeForInsertion = code.split('__child[0]__');
        if (splitedCodeForInsertion.length > 0) {
          const getChildCode = vsItemById(
            `${child?.inputPinId.split('_')[0]}`
          )?.code;
          write =
            write +
            splitedCodeForInsertion[0] +
            getChildCode +
            splitedCodeForInsertion[1];
        }
      });

      //const write = `${vsItems.map((i) => i.code)}`;
      generatedCodeElement.value = write;
    }
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
    const a = getNodeFromNodePin(newConnector.outputPinId);

    setVsItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === a!.id) {
          return { ...item, child: { ...newConnector } };
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
