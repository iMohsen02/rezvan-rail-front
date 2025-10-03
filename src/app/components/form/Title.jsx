function Title({ title, center = false, textSize = 'text-lg', hint }) {
  return (
    <>
      <div
        className={`${
          center && 'text-center'
        } ${textSize} font-bold text-gray-light mx-4 w-full`}
      >
        {title}
        {hint && <p className="font-normal text-base text-gray-dark">{hint}</p>}
      </div>
    </>
  );
}

export default Title;
