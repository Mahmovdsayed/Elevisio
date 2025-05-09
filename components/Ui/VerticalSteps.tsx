'use client'

import React from 'react';
import { useControlledState } from '@react-stately/utils';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { cn } from '@heroui/react';
import type { ButtonProps } from '@heroui/react';

function CheckIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <m.path
                animate={{ pathLength: 1 }}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                transition={{
                    delay: 0.2,
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.3,
                }}
            />
        </svg>
    );
}

interface VerticalStepProps {
    title?: React.ReactNode;
    description?: string;
    className?: string;
}

interface VerticalStepsProps extends React.HTMLAttributes<HTMLDivElement> {
    steps?: VerticalStepProps[];
    color?: ButtonProps["color"];
    currentStep?: number;
    defaultStep?: number;
    onStepChange?: (stepIndex: number) => void;
}

const VerticalSteps = React.forwardRef<HTMLDivElement, VerticalStepsProps>(
    (
        {
            color = "secondary",
            steps = [],
            defaultStep = 0,
            onStepChange,
            currentStep: currentStepProp,
            className,
            ...props
        },
        ref
    ) => {
        const [currentStep, setCurrentStep] = useControlledState(
            currentStepProp,
            defaultStep,
            onStepChange
        );

        const colorsVars = React.useMemo(() => {
            let userColor;
            let fgColor;

            const colorsVars = [
                "[--active-fg-color:var(--step-fg-color)]",
                "[--active-border-color:var(--step-color)]",
                "[--active-color:var(--step-color)]",
                "[--complete-background-color:var(--step-color)]",
                "[--complete-border-color:var(--step-color)]",
                "[--inactive-border-color:hsl(var(--heroui-default-300))]",
                "[--inactive-color:hsl(var(--heroui-default-300))]",
            ];

            switch (color) {
                case "primary":
                    userColor = "[--step-color:hsl(var(--heroui-primary))]";
                    fgColor = "[--step-fg-color:hsl(var(--heroui-primary-foreground))]";
                    break;
                case "secondary":
                    userColor = "[--step-color:hsl(var(--heroui-secondary))]";
                    fgColor = "[--step-fg-color:hsl(var(--heroui-secondary-foreground))]";
                    break;
                case "success":
                    userColor = "[--step-color:hsl(var(--heroui-success))]";
                    fgColor = "[--step-fg-color:hsl(var(--heroui-success-foreground))]";
                    break;
                case "warning":
                    userColor = "[--step-color:hsl(var(--heroui-warning))]";
                    fgColor = "[--step-fg-color:hsl(var(--heroui-warning-foreground))]";
                    break;
                case "danger":
                    userColor = "[--step-color:hsl(var(--heroui-error))]";
                    fgColor = "[--step-fg-color:hsl(var(--heroui-error-foreground))]";
                    break;
                case "default":
                    userColor = "[--step-color:hsl(var(--heroui-default))]";
                    fgColor = "[--step-fg-color:hsl(var(--heroui-default-foreground))]";
                    break;
                default:
                    userColor = "[--step-color:hsl(var(--heroui-primary))]";
                    fgColor = "[--step-fg-color:hsl(var(--heroui-primary-foreground))]";
                    break;
            }

            if (!className?.includes("--step-fg-color")) colorsVars.unshift(fgColor);
            if (!className?.includes("--step-color")) colorsVars.unshift(userColor);
            if (!className?.includes("--inactive-bar-color"))
                colorsVars.push("[--inactive-bar-color:hsl(var(--heroui-default-300))]");

            return colorsVars;
        }, [color, className]);

        return (
            <div className={cn("flex flex-col gap-1", colorsVars, className)} ref={ref} {...props}>
                {steps?.map((step, stepIdx) => {
                    const status =
                        currentStep === stepIdx ? "active" : currentStep < stepIdx ? "inactive" : "complete";

                    return (
                        <div key={stepIdx} className="relative flex flex-col">
                            {stepIdx !== steps.length - 1 && (
                                <div className="absolute left-4 top-8 h-[calc(100%-2rem)] w-0.5 flex flex-col items-center">
                                    <div
                                        className={cn(
                                            "w-0.5 h-full bg-[var(--inactive-bar-color)]",
                                            {
                                                "bg-[var(--active-border-color)]": stepIdx < currentStep,
                                            }
                                        )}
                                    />
                                </div>
                            )}

                            <div className="group flex w-full cursor-pointer items-start gap-x-3 relative z-10">
                                <div className="flex items-center justify-center w-8 h-8">
                                    <LazyMotion features={domAnimation}>
                                        <m.div animate={status} className="relative">
                                            <m.div
                                                className={cn(
                                                    "relative flex h-8 w-8 items-center justify-center rounded-full border-medium text-medium font-semibold",
                                                    {
                                                        "shadow-lg": status === "complete",
                                                    }
                                                )}
                                                initial={false}
                                                transition={{ duration: 0.25 }}
                                                variants={{
                                                    inactive: {
                                                        backgroundColor: "transparent",
                                                        borderColor: "var(--inactive-border-color)",
                                                        color: "var(--inactive-color)",
                                                    },
                                                    active: {
                                                        backgroundColor: "transparent",
                                                        borderColor: "var(--active-border-color)",
                                                        color: "var(--active-color)",
                                                    },
                                                    complete: {
                                                        backgroundColor: "var(--complete-background-color)",
                                                        borderColor: "var(--complete-border-color)",
                                                    },
                                                }}
                                                onClick={() => setCurrentStep(stepIdx)}
                                            >
                                                <div className="flex items-center justify-center">
                                                    {status === "complete" ? (
                                                        <CheckIcon className="h-4 w-4 text-[var(--active-fg-color)]" />
                                                    ) : (
                                                        <span>{stepIdx + 1}</span>
                                                    )}
                                                </div>
                                            </m.div>
                                        </m.div>
                                    </LazyMotion>
                                </div>

                                <div
                                    className="flex flex-col pt-1"
                                    onClick={() => setCurrentStep(stepIdx)}
                                >
                                    <span className={cn(
                                        "text-sm font-medium",
                                        {
                                            "text-[var(--active-color)]": status === 'active',
                                            "text-[var(--inactive-color)]": status === 'inactive',
                                            "text-[var(--complete-border-color)]": status === 'complete',
                                        }
                                    )}>
                                        {step.title}
                                    </span>
                                    <span className={cn(
                                        "text-xs",
                                        {
                                            "text-gray-500": status !== 'active',
                                            "text-[var(--active-color)]": status === 'active',
                                        }
                                    )}>
                                        {step.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
);

VerticalSteps.displayName = "VerticalSteps";

export default VerticalSteps;