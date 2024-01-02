import {Stack, Typography} from '@mui/material';
import X from '../../components/assets/svg/x.svg';
import {ModalLayout} from "../layout/ModalLayout.tsx";
import StyledIconButton from '../common/StyledIconButton.tsx';
import {useCdeContext} from "../../CdeContext.tsx";


function StepOne() {
    const {mapping} = useCdeContext();

    console.log(mapping)

    return (
        <ModalLayout>
            <Stack alignItems="center" justifyContent="center" width="100%" sx={{mx: 6}}>
                <Stack spacing={6} sx={{width: 'max-content'}}>
                    <Typography> This is step 2</Typography>
                </Stack>
            </Stack>
        </ModalLayout>
    );
}

export default StepOne;
