import { useState, useCallback } from 'react';
import { Option } from '../models.ts';

interface PairingSuggestions {
    available: Record<string, Option[]>;
}

export const usePairingSuggestions = () => {
    const [pairingSuggestions, setPairingSuggestions] = useState<PairingSuggestions>({ available: {} });

    const updateAvailableSuggestions = useCallback((variableName: string, newSuggestions: Option[]) => {
        setPairingSuggestions(prev => ({
            ...prev,
            available: { ...prev.available, [variableName]: newSuggestions },
        }));
    }, []);

    const markSuggestionAsProcessed = useCallback((variableName: string, suggestionId: string) => {
        setPairingSuggestions(prev => ({
            ...prev,
            available: {
                ...prev.available,
                [variableName]: prev.available[variableName]?.filter(suggestion => suggestion.id !== suggestionId) || [],
            },
        }));
    }, []);

    const hasPairingSuggestions = useCallback((variableName: string): boolean => {
        return Boolean(pairingSuggestions.available[variableName]?.length);
    }, [pairingSuggestions.available]);

    const getPairingSuggestions = useCallback((variableName: string): Option[] => {
        return pairingSuggestions.available[variableName] || [];
    }, [pairingSuggestions.available]);

    return {
        updateAvailableSuggestions,
        markSuggestionAsProcessed,
        hasPairingSuggestions,
        getPairingSuggestions,
    };
};
