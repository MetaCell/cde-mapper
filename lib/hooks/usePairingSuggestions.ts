import { useState, useCallback } from 'react';
import {Option} from "../models.ts";

interface PairingSuggestions {
    available: Record<string, Option[]>;
    processed: Set<string>;
}

export const usePairingSuggestions = () => {
    const [pairingSuggestions, setPairingSuggestions] = useState<PairingSuggestions>({ available: {}, processed: new Set() });

    const updateAvailableSuggestions = useCallback((variableName: string, newSuggestions: Option[]) => {
        setPairingSuggestions((prev) => ({
            ...prev,
            available: { ...prev.available, [variableName]: newSuggestions },
        }));
    }, []);

    const markSuggestionAsProcessed = useCallback((suggestionId: string) => {
        setPairingSuggestions((prev) => ({
            ...prev,
            processed: new Set(prev.processed).add(suggestionId),
        }));
    }, []);

    const hasPairingSuggestions = (variableName: string): boolean => {
        return pairingSuggestions.available[variableName]?.length > 0;
    };

    const getPairingSuggestions = (variableName: string): Option[] => {
        return pairingSuggestions.available[variableName] || [];
    };

    return {
        updateAvailableSuggestions,
        markSuggestionAsProcessed,
        hasPairingSuggestions,
        getPairingSuggestions
    };
};
