import {} from "solid-js/web"
import type { JSX } from "solid-js"

export function Tree(className: string, style: JSX.CSSProperties, ...props: any) {
  return (
    <ol
      className={"list-tree"}
      role="tree"
      style={{
        position: "relative",
        ...style,
      }}
      {...props}
    />
  )
}

interface TreeItemProps {
  children?: HTMLElement
  className?: string
  // handled below in `handleClick`

  /* eslint-disable react/no-unused-prop-types */
  onSelect?: (e: MouseEvent) => unknown
  onConfirm?: (e: MouseEvent) => unknown
  onTripleClick?: (e: MouseEvent) => unknown

  /* eslint-enable react/no-unused-prop-types */
  selected?: boolean
  onMouseDown?: (e: MouseEvent) => unknown
  onMouseEnter?: (e: MouseEvent) => unknown
  onMouseLeave?: (e: MouseEvent) => unknown
  path?: string
  name?: string
  title?: string
}

export function TreeItem(props: TreeItemProps) {
  // let _liNode: HTMLLIElement | null | undefined
  //
  // function scrollIntoView() {
  //   if (_liNode != null) {
  //     scrollIntoView(_liNode)
  //   }
  // }

  const { className, selected, children, onMouseDown, onMouseEnter, onMouseLeave, path, name, title } = props
  return (
    <div title={title}>
      <li
        aria-selected={selected}
        className={`${className} list-items ${selected}`}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-path={path}
        data-name={name}
        onClick={handleClick}
        // ref={(liNode) => (_liNode = liNode)}
        role="treeitem"
        tabIndex={selected ? "0" : "-1"}
      >
        {selected && typeof children === "string" ? ( // String children must be wrapped to receive correct styles when selected.
          <span>{children}</span>
        ) : (
          children
        )}
      </li>
    </div>
  )
}

type NestedTreeItemProps = {
  title?: HTMLElement
  children?: unknown
  className?: string
  hasFlatChildren?: boolean
  // passthrough to inner TreeList
  selected?: boolean
  collapsed?: boolean
  // handled below in `handleClick`

  /* eslint-disable react/no-unused-prop-types */
  onSelect?: (e: MouseEvent) => unknown
  onConfirm?: (e: MouseEvent) => unknown
  onTripleClick?: (e: MouseEvent) => unknown
  /* eslint-disable react/no-unused-prop-types */
}

export function NestedTreeItem(props: NestedTreeItemProps) {
  let _itemNode: HTMLDivElement | null | undefined

  let _handleClick = (e: MouseEvent) => {
    if (_itemNode == null && !(e.target instanceof Element)) {
      return
    }
    if ((e.target as Element).closest(".list-item") === _itemNode) {
      handleClick(e, props)
    }
  }

  const { className, hasFlatChildren, selected, collapsed, title, children } = props
  return (
    <li
      aria-selected={selected}
      aria-expanded={!collapsed}
      className={`${className} list-items ${selected} ${collapsed} "list-nested-item"`}
      onClick={_handleClick}
      role="treeitem"
      tabIndex={selected ? "0" : "-1"}
    >
      {title === null ? null : (
        <div
          tabIndex={-1}
          className="native-key-bindings list-item"
          // ref={(node) => (_itemNode = node)}
        >
          {title}
        </div>
      )}
      <TreeList hasFlatChildren={hasFlatChildren}>{children}</TreeList>
    </li>
  )
}

type TreeListProps = {
  className?: string

  /* typically, instances of TreeItem or NestedTreeItem. */
  children?: TreeItemProps | NestedTreeItemProps | unknown
  showArrows?: boolean
  hasFlatChildren?: boolean
}

export function TreeList(props: TreeListProps) {
  return (
    <ul
      // className={classnames(
      //   props.className,
      //   {
      //     "has-collapsable-children": props.showArrows,
      //     "has-flat-children": props.hasFlatChildren,
      //   },
      //   "list-tree"
      // )}
      role="group"
    >
      {props.children}
    </ul>
  )
}

function handleClick(e: MouseEvent, props: { onSelect: Function; onConfirm: Function; onTripleClick: Function }): void {
  const numberOfClicks = e.detail

  switch (numberOfClicks) {
    case 1:
      props.onSelect && props.onSelect(e)
      break

    case 2:
      props.onConfirm && props.onConfirm(e)
      break

    case 3:
      props.onTripleClick && props.onTripleClick(e)
      break

    default:
      break
  }
}
