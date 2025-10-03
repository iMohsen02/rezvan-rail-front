import IconDraw from '../Icons/IconDraw';

function Input({
  labelText,
  type = 'text',
  'width-full': widthFull = false,
  id,
  children,
  options,
  error,
  hint,
  register,
  ...others
}) {
  return (
    <div
      className={`relative flex ${
        type === 'checkbox'
          ? 'flex-row bg-gradient-to-l from-dark-light to-8 to-dark-dark rounded-md h-9 content-center justify-between mt-3 px-5'
          : 'flex-col gap-2'
      } ${widthFull ? 'flex-[1_0_100%]' : 'flex-[1_0_17rem] max-w-90'}`}
    >
      {labelText && (
        <label
          htmlFor={id}
          className="w-full min-w-20 text-gray-mid text-sm font-bold content-center"
        >
          {labelText}
        </label>
      )}
      {type === 'area' ? (
        <textarea
          className="focus:to-blue-dark outline-none border-none bg-gradient-to-l from-dark-light to-8 0% to-dark-dark px-2 py-1 rounded-md placeholder:text-gray-dark text-gray-light w-full min-h-32"
          type={type}
          id={id}
          {...register}
          {...others}
        ></textarea>
      ) : (
        <div>
          {type === 'select' ? (
            <select
              {...others}
              {...register}
              className="px-3 focus:to-blue-dark bg-gradient-to-l from-dark-light to-8 0% to-dark-dark rounded-md h-8 outline-none w-full text-gray-light"
            >
              {options}
            </select>
          ) : (
            //  todo make it right border
            <input
              className={`${
                others.disabled ? '' : ''
              } focus:to-blue-dark border-red-500 outline-0 ${'bg-gradient-to-l from-dark-light to-8 0% to-dark-dark text-gray-light'}  px-4 py-1.5 rounded-md placeholder:text-gray-dark w-full ${
                type === 'checkbox' ? 'h-full' : ''
              }`}
              type={type}
              id={id}
              {...register}
              {...others}
            />
          )}
          {children}
        </div>
      )}
      {error && (
        <p className="text-sm text-red-light mt-1 bg-red-dark/10 px-2 p-1 rounded-md">
          <IconDraw icon={'attention'} size={1.2} strokeWidth={2.4} /> {error}
        </p>
      )}
      {hint && <p className="text-sm">{hint}</p>}
    </div>
  );
}

export default Input;
