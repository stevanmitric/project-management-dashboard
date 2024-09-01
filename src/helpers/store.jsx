import { create } from 'zustand';

export const userStore = create(set => ({
  user: null,
  setUser: newUser => set({ user: newUser }),
}));

export const tokenStore = create(set => ({
  token: null,
  setToken: newToken => set({ token: newToken }),
}));

export const managersStore = create(set => ({
  managers: [],
  setManagers: array => set({ managers: array }),
}));

export const dropdownStore = create(set => ({
  isDropdownVisible: false,
  setIsDropdownVisible: () => set({ isDropdownVisible: !isDropdownVisible }),
}));

export const searchTermStore = create(set => ({
  term: null,
  setTerm: value => set({ term: value }),
}));

export const taskDropDownStore = create(set => ({
  isOpen: false,
  setIsOpen: () => set({ isOpen: !isOpen }),
}));

export const showTaskModalStore = create(set => ({
  showTaskModal: false,
  setShowTaskModal: () => set({ showTaskModal: !showTaskModal }),
}));

export const selectedTaskStore = create(set => ({
  selectedTask: null,
  setSelectedTask: value => set({ selectedTask: value }),
}));
