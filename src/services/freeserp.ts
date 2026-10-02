import type { AiTool } from "../types/tool";

const API_URL =
    import.meta.env.VITE_FREESERP_API_URL ?? "/api/freeserp";

interface FreeSerpResponse {
    ok: boolean;
    total: number;
    count: number;
    results: AiTool[];
    error?: string;
}

export async function getAiTools(
    search = "",
    sort = "went_live",
    category = "",
): Promise<AiTool[]> {
    const params = new URLSearchParams({
        index: "sites",
        ai_startups: "1",
        size: "30",
        sort,
        order: "desc",
    });

    if (search.trim()) {
        params.set("q", search.trim());
    }

    if (category) {
        params.set("ai_categories", category);
    }

    const response = await fetch(
        `${API_URL}?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(`FreeSerp API error: ${response.status}`);
    }

    const data: FreeSerpResponse = await response.json();

    if (!data.ok) {
        throw new Error(data.error || "FreeSerp API returned an error");
    }

    return data.results;
}