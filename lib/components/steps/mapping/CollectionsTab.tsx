import { useState } from 'react';
import { Stack, Typography, Box, Button, Link } from '@mui/material';
import StyledCard from '../../common/StyledCard.tsx';
import {useDataContext} from "../../../contexts/data/DataContext.ts";
import ModalHeightWrapper from "../../common/ModalHeightWrapper.tsx";
import Tour from '../../common/Tour.tsx';
import { TourSteps, tutorial } from '../../common/tutorial.tsx';


interface CollectionsProps {
    changeToNextTab: () => void;
    setDefaultCollection: (collectionId: string) => void
}

function CollectionsTab({ changeToNextTab, setDefaultCollection }: CollectionsProps) {
    const {
        collections,
    } = useDataContext();

    const collectionKeys = Object.keys(collections);

    const [selectedCollection, setSelectedCollection] = useState<string>(collectionKeys.length > 0 ? collectionKeys[0] : '');
    const [stepIndex, setStepIndex] = useState(0);

    const handleTourNextStepClick = () => {
        if (isTourOpen) {
            setStepIndex(1);
        }
    };

    const handleRadioChange = (value: string) => {
        setSelectedCollection(value);
    };

    const handleConfirm = () => {
        setDefaultCollection(selectedCollection);
        changeToNextTab();
    };

    console.log("collections: ", collectionKeys)
    console.log("chto za hren?: ", collections[collectionKeys[0]].name)

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
                                Select default repository
                            </Typography>
                            <Typography variant='body2' textAlign="center">
                                This can be changed at any time during the process.
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5} className='repository-cards'>
                            {collectionKeys.map(key => (
                                <StyledCard
                                    key={key}
                                    value={collections[key].name}
                                    isSuggested={collections[key].suggested || false}
                                    selectedValue={selectedCollection === key ? collections[key].name : ""}
                                    onChange={() => handleRadioChange(key)}
                                    handleTourNextStepClick={handleTourNextStepClick}
                                />
                            ))}
                        </Stack>
                        <Stack alignItems="center" sx={{ width: '100%' }}>
                            <Box>
                                <Button
                                    disableRipple
                                    variant="contained"
                                    className='repository__select-btn'
                                    onClick={() => handleConfirm()}
                                >
                                    Select repository
                                </Button>
                            </Box>
                            <Box sx={{ mt: 1.5 }}>
                                <Link href={`mailto:${''}`}>Can’t find the repository you’re looking for? Contact us</Link>
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
