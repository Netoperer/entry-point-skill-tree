export default function FilterDefs() {
  return (
    <defs>
      <filter id="default">
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.17" />
          <feFuncG type="linear" slope="0.17" />
          <feFuncB type="linear" slope="0.17" />
        </feComponentTransfer>
        <feColorMatrix type="saturate" values="0.5" />
      </filter>

      <filter id="selected">
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.21" />
          <feFuncG type="linear" slope="0.11" />
          <feFuncB type="linear" slope="0.88" />
        </feComponentTransfer>
        <feColorMatrix type="saturate" values="0.5" />
      </filter>

      <filter id="unavailable">
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.3" />
          <feFuncG type="linear" slope="0.3" />
          <feFuncB type="linear" slope="0.3" />
        </feComponentTransfer>
      </filter>
    </defs>
  );
}
