type Falsy = 0 | '' | false | null | undefined

export default (...classes: (string | Falsy)[]) =>
  classes.filter(Boolean).join(' ')
