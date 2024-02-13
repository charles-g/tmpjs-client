// @ts-nocheck

'use client'

import React, { useEffect, useRef } from "react";
import { defineCustomElements } from "@duetds/date-picker/dist/loader";
import '@duetds/date-picker/dist/duet/themes/default.css'; // Make sure to import the styles

function useListener(ref, eventName, handler) {
    useEffect(() => {
        if (ref.current) {
            const element = ref.current;
            element.addEventListener(eventName, handler);
            return () => element.removeEventListener(eventName, handler);
        }
    }, [eventName, handler, ref]);
}

type DatePickerProps = {
    onChange?: (event: CustomEvent) => void;
    onFocus?: (event: CustomEvent) => void;
    onBlur?: (event: CustomEvent) => void;
    onOpen?: (event: CustomEvent) => void;
    onClose?: (event: CustomEvent) => void;
    dateAdapter?: string;
    localization?: string;
    value?: string;
};

export function CustomDatePicker(props: DatePickerProps) {
    const ref = useRef(null);

    const {
        onChange,
        onFocus,
        onBlur,
        onOpen,
        onClose,
        dateAdapter,
        localization,
        value
    } = props;

    useListener(ref, "duetChange", onChange);
    useListener(ref, "duetFocus", onFocus);
    useListener(ref, "duetBlur", onBlur);
    useListener(ref, "duetOpen", onOpen);
    useListener(ref, "duetClose", onClose);

    useEffect(() => {
        defineCustomElements(window);
    }, []);

    useEffect(() => {
        ref.current.localization = localization;
        ref.current.dateAdapter = dateAdapter;
    }, [localization, dateAdapter]);

    return (
        <div>
            <duet-date-picker ref={ref} {...props}></duet-date-picker>
        </div>
    );
}
