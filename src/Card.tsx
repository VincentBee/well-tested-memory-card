export interface CardProps {
    value: number;
}

export function Card({ value }: CardProps) {
    return (
        <div data-testid="card" className="card-container">
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
