import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Dropzone from 'react-dropzone';
import { init } from "../lib/main.tsx";

function App() {
    const [cdeFile, setCdeFile] = useState<File | null>(null);
    const [datasetFile, setDatasetFile] = useState<File | null>(null);

    const onCdeFileDrop = (acceptedFiles: File[]) => {
        setCdeFile(acceptedFiles[0]);
    };

    const onDatasetFileDrop = (acceptedFiles: File[]) => {
        setDatasetFile(acceptedFiles[0]);
    };

    const handleRemoveCdeFile = () => {
        setCdeFile(null);
    };

    const handleRemoveDatasetFile = () => {
        setDatasetFile(null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (cdeFile && datasetFile) {
            init({
                cdeFileMapping: cdeFile,
                datasetSample: datasetFile,
                callback: (data: any) => console.log(data),
                repositories: [],
                config: { width: '60%', height: '80%' },
                labName: 'Test'
            });
        }
    };

    return (
        <div className="form-container">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Typography variant="h6">Upload CSV Files</Typography>
                <Dropzone onDrop={onCdeFileDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div
                                {...getRootProps({
                                    sx: {
                                        border: '2px dashed grey',
                                        borderRadius: '4px',
                                        padding: '20px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        marginBottom: '10px',
                                    }
                                })}
                            >
                                <input {...getInputProps()} />
                                {cdeFile ? (
                                    <Box sx={{ marginTop: '10px' }}>
                                        <Typography>{cdeFile.name}</Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{ marginTop: '5px' }}
                                            onClick={handleRemoveCdeFile}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                ) : (
                                    <p>Click to select a Dictionary file</p>
                                )}
                            </div>
                        </section>
                    )}
                </Dropzone>
                <Dropzone onDrop={onDatasetFileDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div
                                {...getRootProps({
                                    sx: {
                                        border: '2px dashed grey',
                                        borderRadius: '4px',
                                        padding: '20px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        marginBottom: '10px',
                                    }
                                })}
                            >
                                <input {...getInputProps()} />
                                {datasetFile ? (
                                    <Box sx={{ marginTop: '10px' }}>
                                        <Typography>{datasetFile.name}</Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{ marginTop: '5px' }}
                                            onClick={handleRemoveDatasetFile}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                ) : (
                                    <p>Click to select a Dataset file</p>
                                )}
                            </div>
                        </section>
                    )}
                </Dropzone>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!cdeFile || !datasetFile}
                >
                    Submit
                </Button>
            </Box>
        </div>
    );
}

export default App;
