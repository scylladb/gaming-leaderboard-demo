import { Card, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";

import { Dispatch, SetStateAction } from "react";

type LeaderboardFiltersProps = {
    setModifiers: Dispatch<SetStateAction<Array<string>>>,
    selectedModifiers: Array<string>,
    instrument: string,
    setInstrument: Dispatch<SetStateAction<string>>,
    difficulty: string,
    setDifficulty: Dispatch<SetStateAction<string>>,
};


export default function LeaderboardFilters({ 
    setModifiers, 
    selectedModifiers,
    instrument,
    setInstrument,
    difficulty,
    setDifficulty
}: LeaderboardFiltersProps) {
    
    const modifiersList = [
        'no-modifiers',
        'no-boosts',
        'all-hopos'
    ];

    const instrumentsList = [
        'guitar',
        'bass',
        'drum'
    ];

    const difficultiesList = [
        'expert+',
        'expert',
        'medium',
        'easy'
    ];

    const handleDifficulty = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;

        setDifficulty(value);
    };
    

    const handleModifiers = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;

        setModifiers(typeof value === 'string' ? value.split(',') : value);
    };

    const handleInstrument = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;

        setInstrument(value);
    }

    return (
        <Card  sx={{ minWidth: 275, mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant="h6" component="h6" sx={{ m: 1 }}>Filters</Typography>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="modifiersLabel">Modifiers</InputLabel>
                <Select
                    labelId="modifiersLabel"
                    id="modifierSelect"
                    label="Modifiers"
                    multiple
                    value={selectedModifiers}
                    onChange={handleModifiers}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {modifiersList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedModifiers.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="instrumentLabel">Instrument</InputLabel>
                <Select
                    labelId="instrumentLabel"
                    id="instrumentSelect"
                    value={instrument}
                    label="Instrument"
                    onChange={handleInstrument}
                >
                    {instrumentsList.map((instrumentType, idx) => (
                        <MenuItem key={idx} value={instrumentType}>{instrumentType}</MenuItem>    
                    ))}
                    
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="difficultyLabel">Difficulty</InputLabel>
                <Select
                    labelId="difficultyLabel"
                    id="difficultySelect"
                    value={difficulty}
                    label="Difficulty"
                    onChange={handleDifficulty}
                >
                    {difficultiesList.map((difficultyType, idx) => (
                        <MenuItem key={idx} value={difficultyType}>{difficultyType}</MenuItem>    
                    ))}
                    
                </Select>
            </FormControl>
        </Card>
    )
}