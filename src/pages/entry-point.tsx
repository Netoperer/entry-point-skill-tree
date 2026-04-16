import ConnectionLine from "../components/entry-point/connection-line";
import PerkNode from "../components/entry-point/perk-node";
import { CONNECTIONS } from "../config/connections";
import { PERK_ENTRIES } from "../config/entries";

export default function EntryPoint() {
  return (
    <div className="w-[90vw] rounded-sm p-2 lg:h-screen 2xl:w-full">
      <svg
        viewBox="0 0 700 700"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        className="m-auto rounded-xl shadow-md lg:h-screen lg:p-4"
      >
        <defs>
          <filter id="default">
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.17" />
              <feFuncG type="linear" slope="0.17" />
              <feFuncB type="linear" slope="0.17" />
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="0.5" />
          </filter>

          <filter id="unavailable">
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.04" />
              <feFuncG type="linear" slope="0.04" />
              <feFuncB type="linear" slope="0.04" />
            </feComponentTransfer>
          </filter>
        </defs>

        {...CONNECTIONS.map((entries) => {
          const [id1, id2] = entries;

          return (
            <ConnectionLine
              entries={entries}
              // isUnlocked={isUnlocked}
              key={`${id1}-${id2}`}
            />
          );
        })}

        {...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
          <PerkNode perkEntry={perk} key={`Perk_${id}`} />
        ))}
      </svg>
    </div>
  );
}
