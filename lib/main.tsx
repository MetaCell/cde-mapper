

import CdeModal from './components/CdeModal';
import {InitParams} from "./models.ts";
import {CdeContextProvider} from "./CdeContext.tsx";
import {createRoot} from "react-dom/client";

export const init = (props: InitParams) => {
    // Create a div element to mount the React component
    const modalDiv = document.createElement('div');
    modalDiv.id = 'cde-modal-container';
    document.body.appendChild(modalDiv);

    // Create a root
    const root = createRoot(modalDiv);

    // Render the React component into the div
    root.render(
        <CdeContextProvider {...props}>
            <CdeModal />
        </CdeContextProvider>,
    );

    // Return a cleanup function to unmount the React component
    return () => {
        root.unmount();
        document.body.removeChild(modalDiv);
    };
};
