import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/solid';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string[];
  onStatusChange: (status: string[]) => void;
  selectedPriority: string[];
  onPriorityChange: (priority: string[]) => void;
  selectedType: string[];
  onTypeChange: (type: string[]) => void;
  selectedStars: string[];
  onStarsChange: (stars: string[]) => void;
  selectedBudget: string[];
  onBudgetChange: (budget: string[]) => void;
  selectedCategory: string[];
  onCategoryChange: (category: string[]) => void;
  dateRange: { start: Date | null; end: Date | null };
  onDateRangeChange: (range: { start: Date | null; end: Date | null }) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedType,
  onTypeChange,
  selectedStars,
  onStarsChange,
  selectedBudget,
  onBudgetChange,
  selectedCategory,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
}) => {
  const statusOptions = [
    { value: 'todo', label: 'À faire' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'cancelled', label: 'Annulé' },
    { value: 'upcoming', label: 'À venir' },
    { value: 'ongoing', label: 'En cours' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Basse' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'high', label: 'Haute' },
  ];

  const typeOptions = [
    { value: 'meeting', label: 'Réunion' },
    { value: 'task', label: 'Tâche' },
    { value: 'reminder', label: 'Rappel' },
    { value: 'other', label: 'Autre' },
  ];

  const starsOptions = [
    { value: '1', label: '1 étoile' },
    { value: '2', label: '2 étoiles' },
    { value: '3', label: '3 étoiles' },
    { value: '4', label: '4 étoiles' },
    { value: '5', label: '5 étoiles' },
  ];

  const budgetOptions = [
    { value: 'low', label: 'Budget limité (< 1000€)' },
    { value: 'medium', label: 'Budget moyen (1000€ - 5000€)' },
    { value: 'high', label: 'Budget élevé (> 5000€)' },
  ];

  const categoryOptions = [
    { value: 'hotel', label: 'Hôtel' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'activity', label: 'Activité' },
    { value: 'transport', label: 'Transport' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'other', label: 'Autre' },
  ];

  const handleStatusToggle = (status: string) => {
    if (selectedStatus.includes(status)) {
      onStatusChange(selectedStatus.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatus, status]);
    }
  };

  const handlePriorityToggle = (priority: string) => {
    if (selectedPriority.includes(priority)) {
      onPriorityChange(selectedPriority.filter((p) => p !== priority));
    } else {
      onPriorityChange([...selectedPriority, priority]);
    }
  };

  const handleTypeToggle = (type: string) => {
    if (selectedType.includes(type)) {
      onTypeChange(selectedType.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedType, type]);
    }
  };

  const handleStarsToggle = (stars: string) => {
    if (selectedStars.includes(stars)) {
      onStarsChange(selectedStars.filter((s) => s !== stars));
    } else {
      onStarsChange([...selectedStars, stars]);
    }
  };

  const handleBudgetToggle = (budget: string) => {
    if (selectedBudget.includes(budget)) {
      onBudgetChange(selectedBudget.filter((b) => b !== budget));
    } else {
      onBudgetChange([...selectedBudget, budget]);
    }
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategory.includes(category)) {
      onCategoryChange(selectedCategory.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategory, category]);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            multiple
            value={selectedStatus}
            onChange={(e) =>
              onStatusChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            multiple
            value={selectedPriority}
            onChange={(e) =>
              onPriorityChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            multiple
            value={selectedType}
            onChange={(e) =>
              onTypeChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            multiple
            value={selectedStars}
            onChange={(e) =>
              onStarsChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          >
            {starsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            multiple
            value={selectedBudget}
            onChange={(e) =>
              onBudgetChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            multiple
            value={selectedCategory}
            onChange={(e) =>
              onCategoryChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Date de début
          </label>
          <input
            type="date"
            id="startDate"
            value={dateRange.start?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              onDateRangeChange({
                ...dateRange,
                start: e.target.value ? new Date(e.target.value) : null,
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            Date de fin
          </label>
          <input
            type="date"
            id="endDate"
            value={dateRange.end?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              onDateRangeChange({
                ...dateRange,
                end: e.target.value ? new Date(e.target.value) : null,
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}; 