import React from 'react';
import './Fab.scss';

export interface FabProps {
    tooltip: string;
    onClick: { (): void };
}

export const Fab: React.FC<FabProps> = ({tooltip, onClick}: FabProps) =>
    (
        <button type="button" className="fab btn btn-microevents form-control form-control-lg text-center"
                onClick={onClick}><span title={tooltip}>+</span></button>
    );

Fab.defaultProps = {
    tooltip: 'click me',
    onClick: () => {
    }
};

export default Fab;
