import {Box, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {ArrowIcon, CheckIcon, CrossIcon, GlobeIcon} from "../../../icons";
import CdeDetails, {CdeDetailItem} from "../../common/CdeDetails.tsx";
import {useState} from "react";


interface PairingSuggestionProps {
    headerOptions: { index: number, label: string }[];
    label: string;
    description: string;
    rowContent: CdeDetailItem[];
    onChange: (selectedHeaderIndex: string | null) => void;
}

const DEFAULT_VALUE = -1

export function PairingSuggestion({
                                      headerOptions,
                                      label,
                                      description,
                                      rowContent,
                                      onChange,
                                  }: PairingSuggestionProps) {
    const [selectedHeaderIndex, setSelectedHeaderIndex] = useState<number>(DEFAULT_VALUE);
    const handleChange = (event: SelectChangeEvent<number>) => {
        const newValue = Number(event.target.value);
        setSelectedHeaderIndex(newValue);
    };

    return (
        <Box sx={{
            position: "relative",
            "&:before": {
                content: "\"\"",
                position: "absolute",
                left: "-1.375rem",
                height: "calc(100% + 3.75rem)",
                bottom: "-2.625rem",
                width: "0.125rem",
                background: "#ECEDEE",
                borderRadius: "3.125rem",
            }
        }}>
            <Box sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                columnGap: "1.5rem",
                "& > div": {
                    display: "flex",
                    alignItems: "center",
                },
                "&:before": {
                    content: "\"\"",
                    position: "absolute",
                    left: "-1.375rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "0.75rem",
                    height: "0.125rem",
                    background: "#ECEDEE",
                    borderTopRightRadius: "3.125rem",
                    borderBottomRightRadius: "3.125rem",
                }
            }} mb={1.5}>
                <Box sx={{width: "18.75rem"}}>
                    <FormControl fullWidth>
                        <Select
                            value={selectedHeaderIndex}
                            onChange={handleChange}
                        >
                            <MenuItem disabled value={-1}
                                      sx={{
                                          color: '#A9ACB2'
                                      }}>
                                <em>Choose column header to map...</em>
                            </MenuItem>
                            {headerOptions.map(option => (
                                <MenuItem key={option.index} value={option.index}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box><ArrowIcon/></Box>
                <Box display="flex" gap={1.5} flex={1}>
                    <Box flex={1} sx={{
                        padding: "0.4375rem 0.875rem",
                        borderRadius: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "#F4F5F5",
                        border: "0.0625rem solid #E4E5E7",
                    }}>
                        <GlobeIcon/>
                        <Typography sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            lineHeight: "142.857%",
                            color: "#070808"
                        }}>
                            {label}
                        </Typography>
                        <Typography sx={{
                            fontSize: "0.875rem",
                            fontWeight: 400,
                            lineHeight: "142.857%",
                            color: "#676C74"
                        }}>
                            {description}
                        </Typography>
                    </Box>

                    <Box display="flex" gap={0.5}>
                        <IconButton sx={{
                            borderRadius: "0.5rem",
                            padding: "0.4375rem",
                        }} onClick={() => onChange(null)}>
                            <CrossIcon/>
                        </IconButton>
                        <IconButton disabled={selectedHeaderIndex === DEFAULT_VALUE}
                                    sx={{
                                        borderRadius: "0.5rem",
                                        padding: "0.4375rem",
                                        border: "0.0625rem solid #D6D8DB",
                                        boxShadow: "0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)"
                                    }}
                                    onClick={() => onChange(headerOptions[selectedHeaderIndex].label)}
                        >
                            <CheckIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <CdeDetails data={rowContent}/>
        </Box>
    );
}