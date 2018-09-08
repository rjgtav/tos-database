export class TOSDataItemTranscend {
  ATKRatio: number;
  MDEFRatio: number;
  PDEFRatio: number;

  private static values: TOSDataItemTranscend[] = [
    // python-start
    { ATKRatio: 0.10, MDEFRatio: 0.10, PDEFRatio: 0.10 },
    { ATKRatio: 0.20, MDEFRatio: 0.20, PDEFRatio: 0.20 },
    { ATKRatio: 0.30, MDEFRatio: 0.30, PDEFRatio: 0.30 },
    { ATKRatio: 0.40, MDEFRatio: 0.40, PDEFRatio: 0.40 },
    { ATKRatio: 0.50, MDEFRatio: 0.50, PDEFRatio: 0.50 },
    { ATKRatio: 0.60, MDEFRatio: 0.60, PDEFRatio: 0.60 },
    { ATKRatio: 0.70, MDEFRatio: 0.70, PDEFRatio: 0.70 },
    { ATKRatio: 0.80, MDEFRatio: 0.80, PDEFRatio: 0.80 },
    { ATKRatio: 0.90, MDEFRatio: 0.90, PDEFRatio: 0.90 },
    { ATKRatio: 1.00, MDEFRatio: 1.00, PDEFRatio: 1.00 },
    // python-end
  ];

  static get(transcendLevel: number) {
    return this.values[transcendLevel - 1];
  }

}

