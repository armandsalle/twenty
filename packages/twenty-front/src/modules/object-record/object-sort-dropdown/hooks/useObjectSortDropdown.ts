import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useSortDropdown } from '@/object-record/object-sort-dropdown/hooks/useSortDropdown';
import isSortDirectionMenuUnfoldedState from '@/object-record/object-sort-dropdown/states/isSortDirectionMenuUnfoldedState';
import selectedSortDirectionState from '@/object-record/object-sort-dropdown/states/selectedSortDirectionState';
import { SortDefinition } from '@/object-record/object-sort-dropdown/types/SortDefinition';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';

import {
  OBJECT_SORT_DROPDOWN_ID,
  VIEW_SORT_DROPDOWN_ID,
} from '../constants/ObjectSortDropdownId';

// TODO: merge this with useSortDropdown
export const useObjectSortDropdown = () => {
  const [searchInput, setSearchInput] = useState('');

  const [isSortDirectionMenuUnfolded, setIsSortDirectionMenuUnfolded] =
    useRecoilState(isSortDirectionMenuUnfoldedState);

  const [selectedSortDirection, setSelectedSortDirection] = useRecoilState(
    selectedSortDirectionState,
  );

  const resetState = useCallback(() => {
    setIsSortDirectionMenuUnfolded(false);
    setSelectedSortDirection('asc');
    setSearchInput('');
  }, [setIsSortDirectionMenuUnfolded, setSelectedSortDirection]);

  const { toggleDropdown, closeDropdown } = useDropdown(
    OBJECT_SORT_DROPDOWN_ID,
  );

  const toggleSortDropdown = () => {
    toggleDropdown();
    resetState();
  };

  const closeSortDropdown = () => {
    closeDropdown();
    resetState();
  };

  const {
    availableSortDefinitionsState,
    onSortSelectState,
    isSortSelectedState,
  } = useSortDropdown({
    sortDropdownId: VIEW_SORT_DROPDOWN_ID,
  });

  const isSortSelected = useRecoilValue(isSortSelectedState);
  const availableSortDefinitions = useRecoilValue(
    availableSortDefinitionsState,
  );
  const onSortSelect = useRecoilValue(onSortSelectState);

  const handleAddSort = (selectedSortDefinition: SortDefinition) => {
    closeSortDropdown();
    onSortSelect?.({
      fieldMetadataId: selectedSortDefinition.fieldMetadataId,
      direction: selectedSortDirection,
      definition: selectedSortDefinition,
    });
  };

  const filteredAvailableSortDefinitions = availableSortDefinitions.filter(
    (sortDefinition) =>
      sortDefinition.label.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const isAvailableSortDefinitionsEmpty =
    filteredAvailableSortDefinitions.length === 0;

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInput(event.target.value);
  };

  return {
    isSortDirectionMenuUnfolded,
    setIsSortDirectionMenuUnfolded,
    selectedSortDirection,
    setSelectedSortDirection,
    toggleSortDropdown,
    resetState,
    isSortSelected,
    availableSortDefinitions,
    handleAddSort,
    isAvailableSortDefinitionsEmpty,
    filteredAvailableSortDefinitions,
    searchInput,
    handleChangeSearchInput,
  };
};
