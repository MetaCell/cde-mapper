import { useState } from 'react';
import { Stack, Typography, Box, Button, Link } from '@mui/material';
import StyledCard from '../../common/StyledCard.tsx';
import { useDataContext } from "../../../contexts/data/DataContext.ts";
import { useUIContext } from '../../../contexts/ui/UIContext.ts';
import ModalHeightWrapper from "../../common/ModalHeightWrapper.tsx";
import Tour from '../../common/Tour.tsx';
import { TourSteps, tutorial } from '../../common/tutorial.tsx';


interface CollectionsProps {
    defaultCollection: string
    changeToNextTab: () => void;
    setDefaultCollection: (collectionId: string) => void
}

function CollectionsTab({defaultCollection, setDefaultCollection, changeToNextTab}: CollectionsProps) {
    const {
        collections,
        emailTemplate
    } = useDataContext();
    const {
        isTourOpen
    } = useUIContext();

    const collectionKeys = Object.keys(collections);

    const [selectedCollection, setSelectedCollection] = useState<string>(defaultCollection);
    const [stepIndex, setStepIndex] = useState(0);
    
    const updateHomeTourStep = () => isTourOpen && setStepIndex(prevStepIndex => prevStepIndex + 1);

    const handleRadioChange = (value: string, selectedValue: string) => {
        if(value !== selectedValue) {
            setSelectedCollection(value);
        }
        updateHomeTourStep();
    };

    const handleConfirm = () => {
        setDefaultCollection(selectedCollection);
        changeToNextTab();
    };

    return (
        <>
            <ModalHeightWrapper height="11.5rem">
                <Box
                    overflow='auto'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height={1}
                    p='1.5rem'
                    pt={6}
                    pb={6}
                >
                    <Stack spacing={6} sx={{ width: 'max-content' }}>
                        <Stack spacing={1}>
                            <Typography variant='h3' textAlign="center">
                                Select default collection
                            </Typography>
                            <Typography variant='body2' textAlign="center">
                                This can be changed at any time during the process.
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5} className='collection-cards'>
                            {collectionKeys.map(key => (
                                <StyledCard
                                    key={key}
                                    value={collections[key].name}
                                    isSuggested={collections[key].suggested || false}
                                    selectedValue={selectedCollection === key ? collections[key].name : ""}
                                    onChange={handleRadioChange}
                                    onAfterChange={updateHomeTourStep}
                                />
                            ))}
                        </Stack>
                        <Stack alignItems="center" sx={{ width: '100%' }}>
                            <Box>
                                <Button
                                    disableRipple
                                    variant="contained"
                                    onClick={() => handleConfirm()}
                                    className='collection__select-btn'
                                >
                                    Select collection
                                </Button>
                            </Box>
                            <Box sx={{ mt: 1.5 }}>
                                <Link href={`mailto:${emailTemplate.email}?subject=${encodeURIComponent(emailTemplate.title) || ''}&body=${encodeURIComponent(emailTemplate.description) || ''}`}>
                                    Can’t find the collection you’re looking for? Contact us
                                </Link>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </ModalHeightWrapper>
            <Tour
                steps={tutorial[TourSteps.Collection]}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
            />
        </>

    );
}

export default CollectionsTab;
