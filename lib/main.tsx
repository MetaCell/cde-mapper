import CdeModal from './components/CdeModal';
import {InitParams} from "./models.ts";
import {DataContextProvider} from "./contexts/data/DataContextProvider.tsx";
import {createRoot} from "react-dom/client";
import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import {UIContextProvider} from "./contexts/ui/UIContextProvider.tsx";
import {ServicesContextProvider} from "./contexts/services/ServicesContextProvider.tsx";

export const init = (props: InitParams) => {
    // Create a div element to mount the React component
    const modalDiv = document.createElement('div');
    modalDiv.id = 'cde-modal-container';
    document.body.appendChild(modalDiv);

    // Create a root
    const root = createRoot(modalDiv);

    const {callback, ...otherProps} = props
    // Render the React component into the div
    root.render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DataContextProvider {...otherProps}>
                <ServicesContextProvider callback={callback}>
                    <UIContextProvider>
                        <CdeModal />
                    </UIContextProvider>
                </ServicesContextProvider>
            </DataContextProvider>
        </ThemeProvider>
    );

    // Return a cleanup function to unmount the React component
    return () => {
        root.unmount();
        document.body.removeChild(modalDiv);
    };
};


export {mapElasticSearchHitsToOptions} from "./helpers/mappers.ts";
