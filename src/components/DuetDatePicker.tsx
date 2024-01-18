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

export function CustomDatePicker({
                               onChange,
                               onFocus,
                               onBlur,
                               onOpen,
                               onClose,
                               dateAdapter,
                               localization,
                               ...props
                           }) {
    const ref = useRef(null);

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
