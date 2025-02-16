import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: ReactNode;
}
interface ErrorBoundaryProps {
  children: ReactNode;
}
// DETECTA PROBLEMAS DENTRO DEL RENDERIZADO
// DETECTA PROBLEMAS DENTRO DE LOS CONTROLADORES DE EVENTOS
// NO DETECTA PROBLEMAS DENTRO DE PROMESAS O CÓDIGO ASÍNCRONO
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: ReactNode) {
    console.log('ErrorBoundary ~ error:', error);
    return { hasError: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
