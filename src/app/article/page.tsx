import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemButton,
  Chip,
} from '@mui/material'
import { useRequest } from '@/lib/api'
import InfoCard from '@/components/InfoCard'
import Main from '@/components/ui/Main'

export default async function Article() {
  const data = await useRequest<FullFrontMatter[]>('article')
  return (
    <>
      <InfoCard />
      <Main>
        <List sx={{ width: '100%', bgcolor: 'background.paper', py: 3 }}>
          {data.map((item) => (
            <ListItemButton
              key={item.id}
              component="a"
              href={'article/' + item.id}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: '#9C27B0',
                    width: 48,
                    height: 48,
                  }}
                >
                  {item.cover ?? item.tags?.[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="#9C27B0"
                    >
                      {item.tags?.map((tag) => (
                        <Chip
                          key={tag}
                          component="span"
                          sx={{
                            mr: 1,
                          }}
                          label={tag}
                          size="small"
                        />
                      ))}
                    </Typography>
                    {item.desc + '...'}
                  </>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Main>
    </>
  )
}
