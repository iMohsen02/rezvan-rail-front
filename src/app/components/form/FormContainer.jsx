function FormContainer({ children, size = 2, id, ...others }) {
  return (
    <form
      {...others}
      className={` flex flex-wrap ${
        size === 2 ? 'gap-10' : size === 1 ? 'gap-5' : size === 0 ? 'gap-1' : ''
      } justify-center mx-auto ${
        size === 2
          ? 'px-4 md:px-8 '
          : size === 1
          ? 'px-5'
          : size === 0
          ? 'px-1'
          : ''
      } max-w-[50rem] m-8 `}
      id={id}
    >
      {children}
    </form>
  );
}

export default FormContainer;
