import { Step } from "react-joyride";

export interface TutorialSection {
    run: boolean;
    stepIndex: number;
    steps: Step[];
};

export interface TutorialSteps {
    home: TutorialSection;
    collection: TutorialSection;
    suggestions: TutorialSection;
    mapping: TutorialSection;
};

export const tutorial: TutorialSteps = {
    home: {
        run: false,
        stepIndex: 0,
        steps: [
            {
                target: '.stats-content',
                content: 'This shows how much mappings you have completed and how much you have left to map.',
                disableBeacon: true,
                title: 'Stats of your mapping',
            },
            {
                target: '.dataset-table',
                content: 'This shows your selected dataset. Important thing to look out here is the column header because that’s what you’l be mapping.',
                title: 'Preview of your dataset',
            },
            {
                target: '.about-info__btn',
                content: 'Lost in what mapping is, how it works? Find out more by clicking this button.',
                placement: 'right-end',
                spotlightClicks: true,
                title: 'Click to open more information',
            },
            {
                target: '.about-info__sidebar',
                content: 'This is a good place to refer to what you’re mapping, what CDEs are, how it works, etc.',
                placement: 'right-start',
                title: 'Information on mappings',
            },
            {
                target: '.sidebar__close-button',
                content: 'Click to close this info sidebar and continue with your mapping.',
                placement: 'right',
                title: 'Click to close and continue',
                spotlightClicks: true
            },
            {
                target: '.mapping__start-btn',
                content: 'Now that you’ve got all the information that you need, click this button to start mapping. All the information on this screen will be available throughout the process to help guide you.',
                spotlightClicks: true,
                title: 'Ready to start mapping?',
            },
        ]
    },
    collection: {
        run: false,
        stepIndex: 0,
        steps: [
            {
                target: '.repository-cards',
                title: 'Select default repository',
                disableBeacon: true,
                spotlightClicks: true,
                content: 'Select a repository that you will commonly use for your mappings. This can be change at any time during the process.'
            },
            {
                target: '.repository__select-btn',
                title: 'Click to confirm your repository selection',
                content: 'Clicking this button will bring you to the next step of the process.'
            }
        ],
    },
    suggestions: {
        run: false,
        stepIndex: 0,
        steps: [
            {
                target: '.suggestions-tab',
                title: 'About suggestions',
                disableBeacon: true,
                content: 'Suggestions are based on what was previously mapped before and are ordered based on the most suitable.'
            },
            {
                target: '.column-header',
                title: 'Column header you’re mapping',
                content: 'This is the column header that you’ll be mapping.'
            },
            {
                target: '.cde-suggestions__content',
                title: 'CDE mapping suggestions',
                disableBeacon: true,
                content: 'This is where you will find all the suggestions. Suggestions are based on previous mapping and are ordered based on the most suitable. Select one suggestion to map your column header with.'
            },
            {
                target: '.suggestion-details',
                title: 'Most suitable mapping',
                content: 'Based on previous mappings, the first suggestion is the one that is the most suitable mapping. Browse other suggestions if you don’t think this is the most suitable.'
            },
            {
                target: '.suggestions__expand-btn',
                title: 'More suggestions',
                disableBeacon: true,
                content: 'We automatically show the top 3 suggestions but if more than that exists, click this button to view all the other suggestions.'
            },
            {
                target: '.suggestions__button-block',
                title: 'Accepting or ignoring suggestions',
                content: 'Once you’ve selected 1 of the suggestions that you’re like to map your column header with, click on the ‘Accept’ button. If no suggestion aligns, you can ignore all suggestions and map it on the next step.'
            },
            {
                target: '.suggestions__navigation-block',
                title: 'Navigating through the different column headers with suggestions',
                content: 'To view all the other column headers that has suggestions, click the ‘<’ & ‘>’ buttons here. Here, you will also be able to see how many column headers contains suggestions.'
            },
            {
                target: '.suggestions__cancel-btn',
                title: 'Continue mapping without suggestions',
                content: 'To map without going through the suggestions, click this button and you will be directed to the next screen where you will be able to map all your column headers.'
            }
        ]
    },
    mapping: {
        run: false,
        stepIndex: 0,
        steps: [
            {
                target: '',
                placement: 'center',
                title: 'Mapping the rest of the dataset',
                content: 'You’ve gone through the suggestions. Now, this screen allows you to map the rest of the dataset and configure the ones that have already been mapped.'
            },
            {
                target: '',
                title: 'Number of column headers left to map',
                content: 'On the top right of this screen, you’ll see the indication of how many column headers that still needs to be mapped.'
            },
            {
                target: '',
                title: 'Search bar',
                content: 'Dealing with possibly hundreds of column headers, simply search the name of a column header or mapped CDEs here.'
            },
            {
                target: '',
                spotlightClicks: true,
                title: 'Click to open filter options',
                content: 'Filter through column headers and only showing those that are relevant to you.'
            },
            {
                target: '',
                title: 'Filter',
                content: 'Filter through column headers and only showing those that are relevant to you.'
            },
            {
                target: '',
                title: 'Unmapped or Mapped',
                content: 'On the first column, you’ll be able to easily tell which column has been mapped and which are unmapped.'
            },
            {
                target: '',
                title: 'Sort by Unmapped or Mapped first',
                content: 'By default, rows are ordered based on .csv (source) ordering. Click this button to sort by unmapped first and click again to sort by mapped first.'
            },
            {
                target: '',
                spotlightClicks: true,
                title: 'Click to open preview',
                content: 'Preview shows an overview of all your mappings in a table format.'
            },
            {
                target: '',
                title: 'Preview',
                content: 'View all your column headers and mapping at a glance. You will also be able to target each column by hover the cell and clicking the target icon. This view showcases snippets of each column’s data.'
            },
            {
                target: '',
                title: 'Unmapped or Mapped',
                content: 'As we went through earlier, this first column, is where you’ll be able to easily tell which column has been mapped and which are unmapped.'
            },
            {
                target: '',
                title: 'Column headers',
                content: 'These are the column headers that you’ve selected and will be mapping CDE or Data dictionary field to.'
            },
            {
                target: '',
                title: 'CDEs / Data Dictionary fields',
                content: 'This will be where you’ll choose your CDE or Data Dictionary field to map your respective column headers with.'
            },
            {
                target: '',
                spotlightClicks: true,
                title: 'Click to choose mapping',
                content: 'To map your column header to a CDE or Data Dictionary field, click to open the dropdown where you will be able to select which to map your column header with.'
            },
            {
                target: '',
                title: 'Choose CDE or Data Dictionary field',
                content: ''
            }
        ]
    }
};
