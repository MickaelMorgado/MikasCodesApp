import { Item } from './flutter';

export enum NodeCategory {
  FLUTTER = 'Flutter',
  JAVASCRIPT = 'Javascript',
}

export const items: Item[] = [
  {
    category: NodeCategory.JAVASCRIPT,
    description: 'Javascript',
    name: 'Document Ready',
    code: `document.read({})`,
    properties: {},
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'Row',
    code: `
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
                __children__
            ],
          )`,
    properties: {
      mainAxis: 'ma',
    },
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'SvgPicture',
    code: `
          SvgPicture.asset(
            HipsPOSAppIcons.I.icIcon,
          )`,
    properties: {},
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'Text',
    code: `
          Text(
            'text',
            style: AppModule.I.appStyles.text2().copyWith(
              fontWeight: FontWeight.bold,
              color: AppModule.I.appColors.black,
            ),
          )`,
    properties: {},
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'Padding',
    code: `
          Padding(
            padding: const EdgeInsets.symmetric(
              vertical: AppDimensions.dimen_15,
            ),
            child: ,
          )
        `,
    properties: {},
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'SizedBox',
    code: `
          const SizedBox(
            width: AppDimensions.dimen_15,
          )`,
    properties: {},
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'Translations',
    code: `final translations = S.current;`,
    properties: {},
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'Column',
    code: `
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            
          ],
        )
        `,
    properties: {},
  },
  {
    category: NodeCategory.FLUTTER,
    description: 'Flutter',
    name: 'Navigate to Page',
    code: `
        AppModule.I.navigateToNamedReplacement(
          PageYouWant.routeName,
        );
        `,
    properties: {},
  },
];
