import { useLocation, useNavigate } from "react-router";
import ConnectionLine from "../components/entry-point/connection-line";
import FilterDefs from "../components/entry-point/filter-defs";
import PerkNode from "../components/entry-point/perk-node";
import { CONNECTIONS } from "../config/connections";
import { PERK_ENTRIES } from "../config/entries";
import { useEffect } from "react";
import { useTreeStore } from "../store/entry-point-store";
import { decode, encode } from "../utils/entry-point/compress-url";
import { areSetsEqual } from "../utils/are-sets-equal";

// TODO: clean up this function
function useUrl() {
  const location = useLocation();
  const navigate = useNavigate();

  const unlockedNodes = useTreeStore((state) => state.unlockedNodes);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get("unlocked");

    if (!encoded || encoded == encode(new Set())) {
      return;
    }

    const set = decode(encoded);

    if (areSetsEqual(unlockedNodes, set)) return;

    useTreeStore.getState().setUnlocked(set);
    console.log(set);
  }, [location.search]);

  useEffect(() => {
    const encoded = encode(unlockedNodes);

    console.log(encoded);
    const params = new URLSearchParams();
    params.set("unlocked", encoded);
    navigate(`?${params.toString()}`, { replace: true });
  }, [unlockedNodes]);
}

export default function EntryPoint() {
  useUrl();

  return (
    <div className="w-[90vw] rounded-sm p-2 lg:h-screen 2xl:w-full">
      <svg
        viewBox="0 0 700 700"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        className="m-auto rounded-xl shadow-md lg:h-screen lg:p-4"
      >
        <FilterDefs />

        {...CONNECTIONS.map((entries) => {
          return <ConnectionLine entries={entries} key={entries.join("-")} />;
        })}

        {...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
          <PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
        ))}
      </svg>
    </div>
  );
}
