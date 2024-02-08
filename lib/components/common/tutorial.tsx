interface Step {
    target: string;
    title: string;
    disableBeacon?: boolean;
    content: string;
    placement?: string;
    spotlightClicks?: boolean;
};

interface TutorialSection {
    run: boolean;
    steps: Step[];
    stepIndex: number;
};

interface TutorialSteps {
    home: TutorialSection;
    stepOne: TutorialSection;
    stepTwo: TutorialSection;
    stepThree: TutorialSection;
};

const buttonBase = {
    backgroundColor: 'transparent',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: '20px',
    padding: '8px 14px',
    boxShadow: '0px 1px 2px 0px rgba(7, 8, 8, 0.05)',
    minWidth: '8.5rem',
    fontWeight: 600,
    WebkitAppearance: 'none' as const,
};

export const tutorialSteps: TutorialSteps = {
    home: {
        run: false,
        steps: [
            {
                target: '.stats-content',
                title: 'Stats of your mapping',
                disableBeacon: true,
                content: 'This shows how much mappings you have completed and how much you have left to map.'
            },
            {
                target: '.dataset-table',
                title: 'Preview of your dataset',
                content: 'This shows your selected dataset. Important thing to look out here is the column header because that’s what you’l be mapping.'
            },
            {
                target: '.about__info-btn',
                title: 'Click to open more information',
                content: 'Lost in what mapping is, how it works? Find out more by clicking this button.',
                placement: 'right-end',
                spotlightClicks: true
            },
            {
                target: '.about__info-sidebar',
                title: 'Information on mappings',
                content: 'This is a good place to refer to what you’re mapping, what CDEs are, how it works, etc.',
                placement: 'right-start'
            },
            {
                target: '.sidebar__close-btn',
                title: 'Click to close and continue',
                content: 'Click to close this info sidebar and continue with your mapping.',
                placement: 'right',
                // spotlightClicks: true
            },
            {
                target: '.mapping__start-btn',
                title: 'Ready to start mapping?',
                content: 'Now that you’ve got all the information that you need, click this button to start mapping. All the information on this screen will be available throughout the process to help guide you.',
                spotlightClicks: true
            },
        ],
        stepIndex: 0
    },
    stepOne: {
        run: false,
        steps: [
            {
                target: '.stats-content',
                title: 'Stats of your mapping',
                disableBeacon: true,
                content: 'This shows how much mappings you have completed and how much you have left to map.'
            },
            {
                target: '.dataset-table',
                title: 'Preview of your dataset',
                content: 'This shows your selected dataset. Important thing to look out here is the column header because that’s what you’l be mapping.'
            }
        ],
        stepIndex: 0
    },
    stepTwo: {
        run: false,
        steps: [
            {
                target: '.stats-content',
                title: 'Stats of your mapping',
                disableBeacon: true,
                content: 'This shows how much mappings you have completed and how much you have left to map.'
            },
            {
                target: '.dataset-table',
                title: 'Preview of your dataset',
                content: 'This shows your selected dataset. Important thing to look out here is the column header because that’s what you’l be mapping.'
            }
        ],
        stepIndex: 0
    },
    stepThree: {
        run: false,
        steps: [
            {
                target: '.stats-content',
                title: 'Stats of your mapping',
                disableBeacon: true,
                content: 'This shows how much mappings you have completed and how much you have left to map.'
            },
            {
                target: '.dataset-table',
                title: 'Preview of your dataset',
                content: 'This shows your selected dataset. Important thing to look out here is the column header because that’s what you’l be mapping.'
            },
            {
                target: '.about__info-btn',
                title: 'Click to open more information',
                content: 'Lost in what mapping is, how it works? Find out more by clicking this button.',
                placement: 'right-end',
                spotlightClicks: true
            },
            {
                target: '.about__info-sidebar',
                title: 'Information on mappings',
                content: 'This is a good place to refer to what you’re mapping, what CDEs are, how it works, etc.',
                placement: 'right-start'
            },
            {
                target: '.sidebar__close-btn',
                title: 'Click to close and continue',
                content: 'Click to close this info sidebar and continue with your mapping.',
                placement: 'right',
                // spotlightClicks: true
            },
            {
                target: '.mapping__start-btn',
                title: 'Ready to start mapping?',
                content: 'Now that you’ve got all the information that you need, click this button to start mapping. All the information on this screen will be available throughout the process to help guide you.',
                spotlightClicks: true
            },
        ],
        stepIndex: 0
    }
};

export const handleNextStep = (stepName: keyof TutorialSteps) => {
    tutorialSteps[stepName].stepIndex += 1;
};

export const styleOptions = {
    options: {
        width: 350,
        arrowColor: '#fff',
        backgroundColor: '#fff',
        primaryColor: '#19418F',
        zIndex: 10000,
    },
    spotlight: {
        borderRadius: '0.5rem'
    },
    beaconOuter: {
        filter: 'none',
        willChange: 'unset'
    },
    tooltip: {
        padding: 0,
        borderRadius: '0.25rem'
    },
    tooltipTitle: {
        color: '#070808',
        fontSize: '14px',
        padding: '24px 24px 12px 24px',
        fontWeight: 600,
    },
    tooltipContent: {
        fontSize: '14px',
        padding: '0 24px 12px 24px',
        color: '#4F5359',
    },
    tooltipContainer: {
        textAlign: 'left',
        lineHeight: '20px',
    },
    tooltipFooter: {
        justifyContent: 'space-between',
        marginTop: 0,
        padding: '12px 24px 12px 24px',
        borderTop: `1px solid #ecedee`
    },
    buttonNext: {
        ...buttonBase,
        backgroundColor: '#19418F',
        color: '#fff',
    },
    buttonBack: {
        ...buttonBase,
        color: '#676C74',
        border: '1px solid #D6D8DB',
        background: '#fff',
    },
    buttonClose: {
        ...buttonBase,
        height: 14,
        padding: 0,
        paddingRight: '24px',
        paddingTop: '24px',
        position: 'absolute' as const,
        right: 0,
        top: 0,
        width: 14,
        boxShadow: 'none',
        border: 'none',
        minWidth: 'auto',
    },
    buttonSkip: {
        ...buttonBase,
        color: '#676C74',
        border: '1px solid #D6D8DB',
        background: '#fff',
    },
};