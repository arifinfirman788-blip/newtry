import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeatureSpec, initialFeatures } from '../data/featureSpecs';

interface FeatureContextType {
  currentFeatureId: string | null;
  setCurrentFeatureId: (id: string | null) => void;
  features: FeatureSpec[];
  updateFeature: (id: string, updates: Partial<FeatureSpec>) => void;
  getFeatureById: (id: string) => FeatureSpec | undefined;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export const FeatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load from localStorage, fallback to initialFeatures
  const [features, setFeatures] = useState<FeatureSpec[]>(() => {
    const saved = localStorage.getItem('app_features_spec_v4');
    return saved ? JSON.parse(saved) : initialFeatures;
  });

  const [currentFeatureId, setCurrentFeatureId] = useState<string | null>('home');

  // Persist to localStorage whenever features change
  useEffect(() => {
    localStorage.setItem('app_features_spec_v4', JSON.stringify(features));
  }, [features]);

  const updateFeature = (id: string, updates: Partial<FeatureSpec>) => {
    setFeatures(prev => {
      const updateRecursive = (list: FeatureSpec[]): FeatureSpec[] => {
        return list.map(f => {
          if (f.id === id) {
            return { ...f, ...updates };
          }
          if (f.subFeatures) {
            return { ...f, subFeatures: updateRecursive(f.subFeatures) };
          }
          return f;
        });
      };
      return updateRecursive(prev);
    });
  };

  const getFeatureById = (id: string): FeatureSpec | undefined => {
    const findRecursive = (list: FeatureSpec[]): FeatureSpec | undefined => {
      for (const f of list) {
        if (f.id === id) return f;
        if (f.subFeatures) {
          const found = findRecursive(f.subFeatures);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findRecursive(features);
  };

  return (
    <FeatureContext.Provider value={{ 
      currentFeatureId, 
      setCurrentFeatureId, 
      features, 
      updateFeature,
      getFeatureById 
    }}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeature = () => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeature must be used within a FeatureProvider');
  }
  return context;
};
