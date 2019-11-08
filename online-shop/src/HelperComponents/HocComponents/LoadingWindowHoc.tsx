import React from "react";
import { PageLoaderComponent } from "./PageLoaderComponent";

interface LoadingWindowProps {
    isLoading: boolean;
}

export const LoadingWindowHoc = <P extends {}>(WrappedComponent: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & LoadingWindowProps> {
        render() {
            const { isLoading, ...props } = this.props;

            if (isLoading) {
                return (
                    <PageLoaderComponent />
                );
            } else {
                return (
                    <WrappedComponent {...props as P} />
                );
            }
        }
    };