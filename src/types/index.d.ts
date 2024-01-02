export type Track = {
    track_id: string,
    cover_url: string,
    title: string,
    album: string,
    artist: string,
    duration: number
}


export type Submission = {
    submission_id: string,
	track_id: string,
	player_id: string,
	modifiers: string[],
	score: number,
	difficulty: string,
	instrument: string,
	stars: number,
	accuracy_percentage: number,
	missed_count: number,
	ghost_notes_count: number,
	max_combo_count: number,
	overdrive_count: number,
	speed: number,
	played_at: Date,
};

export type Player = {
	player_id: string,
	name: string
}