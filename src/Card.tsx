export interface CardProps {
    value: number;
    visible: boolean;
    onClick: (event: any) => void;
}

export function Card({ value, visible, onClick }: CardProps) {
    return (
        <div data-testid="card" className={`card-container ${visible ? 'visible' : ''}`} onClick={onClick}>
            <div className="card">
                <div className="card-front">
                    {value}
                </div>
                <div className="card-back">
                    ?
                </div>
            </div>
        </div>
    )
}
