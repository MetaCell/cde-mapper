import { Step } from "react-joyride";
import { Box, Typography } from "@mui/material";
import MAPPING_PAGE_IMG from "../../images/MappingPage.png";
import PREVIEW_IMG from "../../images/preview.png";


export enum TourSteps {
    Home = "home",
    Collection = "collection",
    Suggestions = "suggestions",
    Mapping = "mapping",
}

export interface TutorialType {
    [TourSteps.Home]: Step[],
    [TourSteps.Collection]: Step[],
    [TourSteps.Suggestions]: Step[],
    [TourSteps.Mapping]: Step[]
}

export const tutorial: TutorialType = {
    [TourSteps.Home]: [
        {
            content: 'This shows how much mappings you have completed and how much you have left to map.',
            title: 'Stats of your mapping',
            target: '.stats-content',
            hideBackButton: true,
            disableBeacon: true,
        },
        {
            content: 'This shows your selected dataset. Important thing to look out here is the column header because that’s what you’l be mapping.',
            title: 'Preview of your dataset',
            target: '.dataset-table',
            hideBackButton: true,
        },
        {
            content: 'Lost in what mapping is, how it works? Find out more by clicking this button.',
            title: 'Click to open more information',
            target: '.about-info__btn',
            placement: 'right-end',
            hideBackButton: true,
            spotlightClicks: true,
            hideFooter: true,
        },
        {
            content: 'This is a good place to refer to what you’re mapping, what CDEs are, how it works, etc.',
            title: 'Information on mappings',
            target: '.about-info__sidebar',
            placement: 'right-start',
            hideBackButton: true,
            spotlightPadding: 0
        },
        {
            content: 'Click to close this info sidebar and continue with your mapping.',
            title: 'Click to close and continue',
            target: '.sidebar__close-button',
            placement: 'right',
            hideBackButton: true,
            spotlightClicks: true,
            hideFooter: true,
            spotlightPadding: 0
        },
        {
            content: 'Now that you’ve got all the information that you need, click this button to start mapping. All the information on this screen will be available throughout the process to help guide you.',
            title: 'Ready to start mapping?',
            target: '.mapping__start-btn',
            spotlightClicks: true,
            hideCloseButton: true,
            hideFooter: true
        },
    ],
    [TourSteps.Collection]: [
        {
            content: 'Select a repository that you will commonly use for your mappings. This can be change at any time during the process.',
            title: 'Select default repository',
            target: '.repository-cards',
            disableBeacon: true,
            spotlightClicks: true,
            hideFooter: true,
        },
        {
            title: 'Click to confirm your repository selection',
            content: 'Clicking this button will bring you to the next step of the process.',
            target: '.repository__select-btn',
            spotlightClicks: true
        }
    ],
    [TourSteps.Suggestions]: [
        {
            content: 'Suggestions are based on what was previously mapped before and are ordered based on the most suitable.',
            title: 'About suggestions',
            target: '.suggestions-tab',
            disableBeacon: true,
            hideBackButton: true
        },
        {
            title: 'Column header you’re mapping',
            content: 'This is the column header that you’ll be mapping.',
            target: '.column-header',
        },
        {
            title: 'CDE mapping suggestions',
            content: 'This is where you will find all the suggestions. Suggestions are based on previous mapping and are ordered based on the most suitable. Select one suggestion to map your column header with.',
            target: '.cde-suggestions__content',
            styles: {
                options: {
                    width: 450
                }
            }
        },
        {
            title: 'Most suitable mapping',
            content: 'Based on previous mappings, the first suggestion is the one that is the most suitable mapping. Browse other suggestions if you don’t think this is the most suitable.',
            target: '.suggestion-details',
            placement: 'bottom'
        },
        {
            target: '.suggestions__expand-btn',
            title: 'More suggestions',
            content: 'We automatically show the top 3 suggestions but if more than that exists, click this button to view all the other suggestions.'
        },
        {
            content: 'Once you’ve selected 1 of the suggestions that you’re like to map your column header with, click on the ‘Accept’ button. If no suggestion aligns, you can ignore all suggestions and map it on the next step.',
            title: 'Accepting or ignoring suggestions',
            target: '.suggestions__button-block',
            styles: {
                options: {
                    width: 450
                }
            },
            placement: 'top-end'
        },
        {
            target: '.suggestions__navigation-block',
            title: 'Navigating through the different column headers with suggestions',
            content: 'To view all the other column headers that has suggestions, click the ‘<’ & ‘>’ buttons here. Here, you will also be able to see how many column headers contains suggestions.',
            placement: 'top-start',
            styles: {
                options: {
                    width: 450
                }
            }
        },
        {
            title: 'Continue mapping without suggestions',
            content: 'To map without going through the suggestions, click this button and you will be directed to the next screen where you will be able to map all your column headers.',
            target: '.suggestions__cancel-btn',
            placement: 'bottom-end',
            spotlightClicks: true
        }
    ],
    [TourSteps.Mapping]: [
        {
            content: 'You’ve gone through the suggestions. Now, this screen allows you to map the rest of the dataset and configure the ones that have already been mapped.',
            title: 'Mapping the rest of the dataset',
            target: '.mapping-step',
            disableBeacon: true,
            hideBackButton: true,
            styles: {
                options: {
                    width: 450
                }
            },
            placement: 'center',
        },
        {
            title: 'Number of column headers left to map',
            content: 'On the top right of this screen, you’ll see the indication of how many column headers that still needs to be mapped.',
            target: '.mapping-header__indicator',
        },
        {
            title: 'Search bar',
            content: 'Dealing with possibly hundreds of column headers, simply search the name of a column header or mapped CDEs here.',
            target: '.mapping__search-input'
        },
        // {
        //     target: '.mapping__filter-btn',
        //     title: 'Click to open filter options',
        //     content: 'Filter through column headers and only showing those that are relevant to you.',
        //     spotlightClicks: true,
        //     hideFooter: true,
        //     placement: 'bottom-end'
        // },
        // {
        //     content: 'Filter through column headers and only showing those that are relevant to you.',
        //     title: 'Filter',
        //     target: '.mapping__filter-popover',
        //     placement: 'right',
        //     hideBackButton: true
        // },
        {
            title: 'Sort by Unmapped or Mapped first',
            content: <Box display="flex" flexDirection="column">
                <Typography variant="body1" sx={{ fontSize: 14 }}>
                    By default, rows are ordered based on .csv (source) ordering. Click this button to sort by unmapped first and click again to sort by mapped first.
                </Typography>
                <Box
                    component="img"
                    mt={2}
                    alt="Mapping Dashboard Image"
                    src={MAPPING_PAGE_IMG}
                />
            </Box>,
            target: '.mapping__sort-icon',
            placement: 'left',
            hideBackButton: true
        },
        {
            title: 'Click to open preview',
            content: 'Preview shows an overview of all your mappings in a table format.',
            target: '.preview__toggle_false',
            spotlightClicks: true,
            hideFooter: true,
            placement: 'top-start',
            spotlightPadding: 0
        },
        {
            title: 'Preview',
            content: <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontSize: 14, alignSelf: 'start' }}>
                    View all your column headers and mapping at a glance. You will also be able to target each column by hover the cell and clicking the target icon. This view showcases snippets of each column’s data.
                </Typography>
                <Box
                    component="img"
                    width={220}
                    height={150}
                    alt="Mapping Dashboard Image"
                    src={PREVIEW_IMG}
                />
            </Box>,
            target: '.preview__toggle',
            placement: 'top-start',
            hideBackButton: true,
            spotlightPadding: 0,
            styles: {
                options: {
                    width: 620
                }
            },
        },
        {
            title: 'Unmapped or Mapped',
            content: 'As we went through earlier, this first column, is where you’ll be able to easily tell which column has been mapped and which are unmapped.',
            target: '.mapping-chip',
            placement: 'left',
            hideBackButton: true
        },
        {
            title: 'Column headers',
            content: 'These are the column headers that you’ve selected and will be mapping CDE or Data dictionary field to.',
            target: '.mapping__column-header',
            placement: 'bottom'
        },
        {
            title: 'CDEs / Data Dictionary fields',
            content: 'This will be where you’ll choose your CDE or Data Dictionary field to map your respective column headers with.',
            target: '.cde-fields__item-first',
            placement: 'right'
        },
        {
            title: 'Click to choose mapping',
            content: 'To map your column header to a CDE or Data Dictionary field, click to open the dropdown where you will be able to select which to map your column header with.',
            target: '.cde-fields__item-first',
            spotlightClicks: true,
            hideFooter: true,
            placement: 'bottom-start'
        },
        {
            title: 'Choose CDE or Data Dictionary field',
            content: '',
            target: '.cde-field__popper',
            placement: 'bottom-start',
            hideBackButton: true,
            showSkipButton: false
        }
    ]
};