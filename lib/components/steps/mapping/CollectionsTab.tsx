import {useState} from 'react';
import {Stack, Typography, Box, Button, Link} from '@mui/material';
import StyledCard from '../../common/StyledCard.tsx';
import {useDataContext} from "../../../contexts/data/DataContext.ts";
import ModalHeightWrapper from "../../common/ModalHeightWrapper.tsx";


interface CollectionsProps {
    changeToNextTab: () => void;
    setDefaultCollection: (collectionId: string) => void
}

function CollectionsTab({changeToNextTab, setDefaultCollection}: CollectionsProps) {
    const {
        collections,
        emailTemplate
    } = useDataContext();

    const collectionKeys = Object.keys(collections);

    const [selectedCollection, setSelectedCollection] = useState<string>(collectionKeys.length > 0 ? collectionKeys[0] : '');

    const handleRadioChange = (value: string) => {
        setSelectedCollection(value);
    };

    const handleConfirm = () => {
        setDefaultCollection(selectedCollection);
        changeToNextTab();
    };

    return (
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
                <Stack spacing={6} sx={{width: 'max-content'}}>
                    <Stack spacing={1}>
                        <Typography variant='h3' textAlign="center">
                            Select default repository
                        </Typography>
                        <Typography variant='body2' textAlign="center">
                            This can be changed at any time during the process.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.5}>
                        {collectionKeys.map(key => (
                            <StyledCard
                                key={key}
                                value={collections[key].name}
                                isSuggested={collections[key].suggested || false}
                                selectedValue={selectedCollection === key ? collections[key].name : ""}
                                onChange={() => handleRadioChange(key)}
                            />
                        ))}
                    </Stack>
                    <Stack alignItems="center" sx={{width: '100%'}}>
                        <Box>
                            <Button
                                disableRipple
                                variant="contained"
                                onClick={() => handleConfirm()}
                            >
                                Select repository
                            </Button>
                        </Box>
                        <Box sx={{mt: 1.5}}>
                            <Link href={`mailto:${emailTemplate.email}?subject=${encodeURIComponent(emailTemplate.title) || ''}&body=${encodeURIComponent(emailTemplate.description) || ''}`}>
                                Can’t find the repository you’re looking for? Contact us
                            </Link>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </ModalHeightWrapper>

    );
}

export default CollectionsTab;
