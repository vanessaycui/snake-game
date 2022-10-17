import copy

def sort_by_start(d):
  return d['start']

def merge_ranges(times):
  times_copy = copy.deepcopy(times)

  times_copy.sort(key=sort_by_start)

  merged_times = [times_copy[0]]

  for i in range(1, len(times_copy)):
    current = times_copy[i]
    last_merged = merged_times[-1]

    if current['start'] <= last_merged['end']:
      last_merged['end'] = max(last_merged['end'], current['end'])
    else:
      merged_times.append(current)

  return merged_times

# driver code

start = 'start'
end = 'end'
events = [
  { start: 0, end: 1 },
  { start: 3, end: 6 },
  { start: 4, end: 5 },
  { start: 5, end: 7 },
  { start: 11, end: 14 },
  { start: 8, end: 11 }
]

print(merge_ranges(events))

