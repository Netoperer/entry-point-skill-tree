import type { StateCreator } from "zustand";
import { RootNode } from "@/features/freelancers-cut/types";
import { areSetsEqual } from "@/shared/utils/are-sets-equal";
import type { StoreState } from ".";

export interface PersistentSlice {
	unlockedNodes: Set<string>;
	rootNode: RootNode;
	perkLimit: number;
	specialization: string | null;

	setRootNode: (id: RootNode) => void;

	unlockNode: (id: string) => void;
	unlockNodes: (nodes: string[]) => void;
	lockNode: (id: string) => void;
	lockNodes: (nodes: string[]) => void;
	setUnlocked: (unlockedSet: Set<string>) => void;

	setPerkLimit: (amout: number) => void;

	setSpecialization: (id: string | null) => void;
}

// persistent between reloads via url not local storage
export const createPersistentSlice: StateCreator<
	StoreState,
	[["zustand/immer", never]],
	[],
	PersistentSlice
> = (set): PersistentSlice => ({
	unlockedNodes: new Set<string>([RootNode.LockArtist]),
	rootNode: RootNode.LockArtist,
	perkLimit: 50,
	specialization: null,

	unlockNode: (id) =>
		set((state: PersistentSlice) => {
			state.unlockedNodes.add(id);
		}),

	unlockNodes: (nodes: string[]) =>
		set((state) => {
			for (const node of nodes) {
				state.unlockedNodes.add(node);
			}
		}),

	lockNode: (id) =>
		set((state: PersistentSlice) => {
			state.unlockedNodes.delete(id);
		}),

	lockNodes: (nodes: string[]) =>
		set((state) => {
			for (const node of nodes) {
				state.unlockedNodes.delete(node);
			}
		}),

	setUnlocked: (unlockedSet) =>
		set((state: PersistentSlice) => {
			if (areSetsEqual(state.unlockedNodes, unlockedSet)) {
				return;
			}
			state.unlockedNodes = unlockedSet;
		}),

	setRootNode: (id) =>
		set((state) => {
			state.unlockedNodes = new Set([id]);
			state.rootNode = id;
		}),

	setPerkLimit: (amount) =>
		set((state) => {
			state.perkLimit = amount;
		}),

	setSpecialization: (id) =>
		set((state) => {
			state.specialization = id;
		}),
});
