import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text
} from "react-native";
import {
  InstantSearch,
  Index,
  connectInfiniteHits,
  connectHighlight
} from "react-instantsearch-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

export default class App extends Component {
  state = {
    refreshKey: 0,
    isFetching: false
  };

  onRefresh = () => {
    this.setState({ isFetching: true }, () =>
      this.setState({ refreshKey: Date.now(), isFetching: false })
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <InstantSearch
          appId={"ZP039NUGT7"}
          apiKey={"05df73a40f1c055808be2857410b22fc"}
          indexName="news_"
          root={{
            Root: View,
            props: {
              style: styles.container
            }
          }}
          key={this.state.refreshKey}
        >
          <ScrollableTabView style={styles.container}>
            <Index
              indexName="news_"
              indexId="news_1"
              tabLabel="news1"
              root={{
                Root: View,
                props: {
                  style: {
                    flex: 1
                  }
                }
              }}
            >
              <HitsNews onRefresh={this.onRefresh} />
            </Index>

            <Index
              indexName="news_"
              indexId="news_2"
              tabLabel="news2"
              root={{
                Root: View,
                props: {
                  style: {
                    flex: 1
                  }
                }
              }}
            >
              <HitsNews onRefresh={this.onRefresh} />
            </Index>
          </ScrollableTabView>
        </InstantSearch>
      </SafeAreaView>
    );
  }
}

const HitsNews = connectInfiniteHits(props => (
  <FlatList
    data={props.hits}
    extraData={props.hits}
    renderItem={({ item }) => <Hit hit={item} />}
    keyExtractor={(_, index) => index.toString()}
    ListEmptyComponent={
      <View style={styles.empty}>
        <Text>{props.hits && props.hits.length}</Text>
      </View>
    }
    refreshControl={
      <RefreshControl
        refreshing={props.isFetching}
        onRefresh={props.onRefresh}
      />
    }
    contentContainerStyle={styles.contentContainer}
  />
));

const Hit = connectHighlight(props => {
  return <Text style={styles.item}>{props.hit.title}</Text>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1
  },
  item: {
    color: "black",
    minHeight: 100,
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  empty: {
    flex: 1,
    backgroundColor: "red"
  }
});
