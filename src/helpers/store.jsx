import { create } from 'zustand';

export const useUserStore = create(set => ({
  user: null,
  setUser: newUser => set({ user: newUser }),
}));

export const useTokenStore = create(set => ({
  token: null,
  setToken: newToken => set({ token: newToken }),
}));

export const useManagersStore = create(set => ({
  managers: [],
  setManagers: array => set({ managers: array }),
}));

export const useDropdownStore = create(set => ({
  isDropdownVisible: false,
  setIsDropdownVisible: () =>
    set(state => ({ isDropdownVisible: !state.isDropdownVisible })),
}));

export const useSearchTermStore = create(set => ({
  term: null,
  setTerm: value => set({ term: value }),
}));

export const useTaskDropDownStore = create(set => ({
  isOpen: false,
  setIsOpen: () => set(state => ({ isOpen: !state.isOpen })),
}));

export const useShowTaskModalStore = create(set => ({
  showTaskModal: false,
  setShowTaskModal: () =>
    set(state => ({ showTaskModal: !state.showTaskModal })),
}));

export const useSelectedTaskStore = create(set => ({
  selectedTask: null,
  setSelectedTask: value => set({ selectedTask: value }),
}));

export const useClientsStore = create(set => ({
  clients: [],
  setClients: array => set({ clients: array }),
}));

export const useShowClientModalStore = create(set => ({
  showClientModal: false,
  setShowClientModal: () =>
    set(state => ({ showClientModal: !state.showClientModal })),
}));

export const useLoadingStore = create(set => ({
  isLoading: false,
  setIsLoading: () => set(state => ({ isLoading: !state.isLoading })),
}));
