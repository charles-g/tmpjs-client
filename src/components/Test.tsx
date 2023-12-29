import React from "react";

type NegativeRefinementListClassNames = {
    root: string,
    noRefinementRoot: string,
    list: string,
    item: string,
    selectedItem: string,
    label: string,
    checkbox: string,
    labelText: string,
    count: string,
};

export type NegativeRefinementListProps = React.ComponentProps<'div'> & {
    classNames?: Partial<NegativeRefinementListClassNames>,
} & NegativeRefinementListParams;

export function NegativeRefinementList({
                                           attribute,
                                           classNames = {},
                                           ...props
                                       }: NegativeRefinementListProps) {
    // …

    return (
        <div
            {...props}
            className={cx(
                'ais-NegativeRefinementList',
                classNames.root,
                !canRefine &&
                cx('ais-NegativeRefinementList--noRefinement', classNames.noRefinementRoot),
                props.className
            )}
        >
            <ul className={cx('ais-NegativeRefinementList-list', classNames.list)}>
                {items.map((item) => (
                    <li
                        key={item.name}
                        className={cx(
                            'ais-NegativeRefinementList-item',
                            classNames.item,
                            item.isExcluded &&
                            cx('ais-NegativeRefinementList-item--selected', classNames.selectedItem)
                        )}
                    >
                        <label className={cx('ais-NegativeRefinementList-label', classNames.label)}>
                            <input
                                checked={item.isExcluded}
                                type="checkbox"
                                className={cx(
                                    'ais-NegativeRefinementList-checkbox',
                                    classNames.checkbox
                                )}
                                value={item.name}
                                onChange={() => refine(item.name)}
                            />
                            <span
                                className={cx(
                                    'ais-NegativeRefinementList-labelText',
                                    classNames.labelText
                                )}
                            >
                {item.name}
              </span>
                            <span
                                className={cx('ais-NegativeRefinementList-count', classNames.count)}
                            >
                {item.count}
              </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
