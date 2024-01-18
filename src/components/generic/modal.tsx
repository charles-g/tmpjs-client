import React, {Children} from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@radix-ui/react-dialog';

const findChildById = (children, targetId) => {
    let foundChild = null;

    React.Children.forEach(children, (child: any) => {
        if (React.isValidElement(child) && child.props.id === targetId) {
            foundChild = child;
        }
    });

    return foundChild;
};

const CustomModal = ({ open, onClose, children, templateParts }) => {

    const wrapper = findChildById(children, templateParts.wrapperId);
    const content = findChildById(wrapper.props.children, templateParts.contentId);
    const bottomButton = findChildById(wrapper.props.children, templateParts.actionId);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogOverlay className="fixed inset-0 bg-black/50" />
            <DialogContent className="fixed inset-0 flex flex-col items-center justify-center">
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
