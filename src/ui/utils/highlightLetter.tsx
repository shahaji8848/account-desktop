export const highlightLetter = (name: string, letter: string) => {
  if (!name || !letter) return name;

  // Ensure the letter is uppercase
  const uppercaseLetter = letter.toUpperCase();

  // Find the index of the letter in the name (case insensitive)
  const index = name.toLowerCase().indexOf(letter.toLowerCase());

  // If the letter is not found, return the name as is
  if (index === -1) return name;

  return (
    <>
      {name.substring(0, index)}
      <span style={{ color: "#87bde6", fontWeight: "bold" }}>
        {name.charAt(index).toUpperCase()}
      </span>
      {name.substring(index + 1)}
    </>
  );
};


