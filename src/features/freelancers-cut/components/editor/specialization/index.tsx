import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectAvailableSpecializationIds } from "@/features/freelancers-cut/store/selectors/select-available-specializations";
import { AvailableSpecializations } from "./available-specializations";
import { SelectedSpecialization } from "./selected-specialization";

export function Specialization() {
	const availableSpecializationIds = useFreelancersCutStore(
		selectAvailableSpecializationIds,
	);

	const specializationId = useFreelancersCutStore(
		(store) => store.specialization,
	);

	if (specializationId) {
		return <SelectedSpecialization id={specializationId} />;
	}

	if (availableSpecializationIds.length === 0) {
		return null;
	}

	return <AvailableSpecializations ids={availableSpecializationIds} />;
}
