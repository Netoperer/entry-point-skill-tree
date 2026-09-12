export function FilterDefs() {
	return (
		<defs>
			<filter id="default">
				<feColorMatrix
					type="matrix"
					values="0.33 0 0 0 0 0 0.33 0 0 0 0 0 0.33 0 0 0 0 0 1 0"
				/>
				<feComponentTransfer>
					<feFuncR type="linear" slope="0.5" />
					<feFuncG type="linear" slope="0.5" />
					<feFuncB type="linear" slope="0.5" />
				</feComponentTransfer>
			</filter>

			<filter id="selected" colorInterpolationFilters="sRGB">
				<feColorMatrix
					in="SourceGraphic"
					type="saturate"
					values="1.5"
					result="sat"
				/>
				<feComponentTransfer in="sat" result="bright">
					<feFuncR type="linear" slope="1.15" intercept="0.02" />
					<feFuncG type="linear" slope="1.15" intercept="0.02" />
					<feFuncB type="linear" slope="1.15" intercept="0.02" />
				</feComponentTransfer>
				<feFlood floodColor="#4765EB" floodOpacity="0.25" result="tint" />
				<feComposite in="tint" in2="SourceAlpha" operator="in" result="tintClip" />
				<feMerge>
					<feMergeNode in="bright" />
					<feMergeNode in="tintClip" />
				</feMerge>
			</filter>

			<filter id="highlighted" colorInterpolationFilters="sRGB">
				<feColorMatrix
					in="SourceGraphic"
					type="saturate"
					values="1.3"
					result="sat"
				/>
				<feComponentTransfer in="sat" result="bright">
					<feFuncR type="linear" slope="1.05" intercept="0.03" />
					<feFuncG type="linear" slope="1.05" intercept="0.03" />
					<feFuncB type="linear" slope="1.05" intercept="0.03" />
				</feComponentTransfer>
				<feFlood floodColor="#EF4444" floodOpacity="0.35" result="tint" />
				<feComposite in="tint" in2="SourceAlpha" operator="in" result="tintClip" />
				<feMerge>
					<feMergeNode in="bright" />
					<feMergeNode in="tintClip" />
				</feMerge>
			</filter>

			<filter id="unlocked" colorInterpolationFilters="sRGB">
				<feColorMatrix
					in="SourceGraphic"
					type="saturate"
					values="1.25"
					result="sat"
				/>
				<feComponentTransfer in="sat" result="bright">
					<feFuncR type="linear" slope="1.08" intercept="0.02" />
					<feFuncG type="linear" slope="1.08" intercept="0.02" />
					<feFuncB type="linear" slope="1.08" intercept="0.02" />
				</feComponentTransfer>
				<feFlood floodColor="#4765EB" floodOpacity="0.15" result="sheen" />
				<feComposite
					in="sheen"
					in2="SourceAlpha"
					operator="in"
					result="sheenClip"
				/>
				<feMerge>
					<feMergeNode in="bright" />
					<feMergeNode in="sheenClip" />
				</feMerge>
			</filter>

			<linearGradient id="unlockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#4765EB" stopOpacity="0.2" />
				<stop
					offset="100%"
					stopColor="#4765EB"
					stopOpacity="0.05"
				/>
			</linearGradient>
		</defs>
	);
}
