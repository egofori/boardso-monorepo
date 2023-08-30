import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react"
import { UICard } from "./Card"

// import "./styles.css"
interface Props {
  children: React.ReactNode
  list: any
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}
export function UIDropdown({ children, list, isOpen, setIsOpen }: Props) {
  //   const [isOpen, setIsOpen] = useState(false)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip({ fallbackAxisSideDirection: "end" }), shift()],
    whileElementsMounted: autoUpdate,
  })

  //   const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role])

  const headingId = useId()

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <UICard
            ref={refs.setFloating}
            className="absolute mt-[5px] left-0 z-[999]"
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            {list}
          </UICard>
        </FloatingFocusManager>
      )}
    </>
  )
}
