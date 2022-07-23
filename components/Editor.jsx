const { Controlled } = require("react-codemirror2");

export default function Editor({ title, language, value, onChange }) {
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    require("codemirror/lib/codemirror.css");
    require("codemirror/theme/material.css");
    require("codemirror/mode/xml/xml");
    require("codemirror/mode/javascript/javascript");
    require("codemirror/mode/css/css");
  }

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className="border border-blue-300 mt-4 rounded-md">
      <div className="font-bold underline px-4 py-2">👨‍💻 {title}</div>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className="w-[32vw] text-[1.1rem]"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: "material",
        }}
      />
    </div>
  );
}
