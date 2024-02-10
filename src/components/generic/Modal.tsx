// @ts-nocheck

import React from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@radix-ui/react-dialog';

const findChildById = (children: React.ReactNode, targetId: string) => {
    let foundChild = null;

    React.Children.forEach(children, (child: React.ReactNode) => {
        if (React.isValidElement(child) && child.props.id === targetId) {
            foundChild = child;
        }
    });

    return foundChild;
};

type ModalPropTypes = {
    open: boolean,
    onClose: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode,
    templateParts: {
        wrapperId: string,
        contentId: string,
        actionId: string,
    },
};

const CustomModal = ({ open, onClose, children, templateParts }: ModalPropTypes) => {

    const wrapper = findChildById(children, templateParts.wrapperId);
    const content = wrapper ? findChildById(wrapper.props.children, templateParts.contentId) : null;
    const bottomButton = wrapper ? findChildById(wrapper.props.children, templateParts.actionId) : null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogOverlay className="fixed inset-0 bg-black/50" />
            <DialogContent className="fixed inset-0 flex flex-col items-center justify-center">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                    Close X
                </button>
                <div className="bg-white p-8 w-full md:w-1/2 overflow-y-auto h-full md:h-3/4">
                    {content}
                </div>
                <div className="bg-white w-full md:w-1/2">
                    <div className="flex justify-center pt-2 pb-4">
                        {bottomButton}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomModal;
