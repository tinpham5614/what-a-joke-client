import { CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Card, CardContent, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

type Joke = {
  _id: string;
  joke: string;
  favoriteCount: number;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
};

export default function JokeCard({
  _id,
  joke,
  favoriteCount,
  isFavorite,
  onFavorite,
}: Joke) {
  return (
    <Card variant="outlined" sx={{ marginY: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {joke}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton
          onClick={() => onFavorite(_id)}
          color={isFavorite ? "secondary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography variant="subtitle2" component="div">
          {favoriteCount}
        </Typography>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
