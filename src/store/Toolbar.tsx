import { create } from 'zustand';

interface HistoryState {
  zoomLevel: number;
  showRoof: boolean;
}

interface ToolbarState {
  showRoof: boolean;
  zoomLevel: number;
  history: HistoryState[];
  currentHistoryIndex: number;

  // Actions
  setShowRoof: (show: boolean) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleReset: () => void;
  handleUndo: () => void;
  handleFullscreen: () => void;
  handleRoofToggle: (checked: boolean) => void;
}

const useToolbarStore = create<ToolbarState>((set, get) => ({
  showRoof: true,
  zoomLevel: 1,
  history: [],
  currentHistoryIndex: -1,

  setShowRoof: (show) => set({ showRoof: show }),

  handleZoomIn: () => {
    const currentState = {
      zoomLevel: get().zoomLevel * 1.2,
      showRoof: get().showRoof,
    };
    set((state) => ({
      zoomLevel: Math.min(currentState.zoomLevel, 5), // Max zoom 5x
      history: [...state.history.slice(0, state.currentHistoryIndex + 1), currentState],
      currentHistoryIndex: state.currentHistoryIndex + 1,
    }));
    console.log('Zoom in', get().zoomLevel);
  },

  handleZoomOut: () => {
    const currentState = {
      zoomLevel: get().zoomLevel / 1.2,
      showRoof: get().showRoof,
    };
    set((state) => ({
      zoomLevel: Math.max(currentState.zoomLevel, 0.2), // Min zoom 0.2x
      history: [...state.history.slice(0, state.currentHistoryIndex + 1), currentState],
      currentHistoryIndex: state.currentHistoryIndex + 1,
    }));
    console.log('Zoom out', get().zoomLevel);
  },

  handleReset: () => {
    const currentState = {
      zoomLevel: 1,
      showRoof: get().showRoof,
    };
    set((state) => ({
      zoomLevel: 1,
      history: [...state.history.slice(0, state.currentHistoryIndex + 1), currentState],
      currentHistoryIndex: state.currentHistoryIndex + 1,
    }));
    console.log('Reset view');
  },

  handleUndo: () => {
    const { history, currentHistoryIndex } = get();
    if (currentHistoryIndex > 0) {
      const previousState = history[currentHistoryIndex - 1];
      set({
        currentHistoryIndex: currentHistoryIndex - 1,
        zoomLevel: previousState.zoomLevel,
        showRoof: previousState.showRoof,
      });
      console.log('Undo to previous state');
    }
  },

  handleFullscreen: () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  },

  handleRoofToggle: (checked) => {
    set({ showRoof: checked });
    console.log('Roof toggle:', checked);
  },
}));

export default useToolbarStore;
